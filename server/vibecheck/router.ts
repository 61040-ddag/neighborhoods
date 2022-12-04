import type { Request, Response } from 'express';
import express from 'express';
import VibeCollection from './collection';
import * as userValidator from '../user/middleware';
import * as VibeValidator from './middleware';
import * as neighborhoodValidator from '../neighborhood/middleware';
import * as util from './util';
import UserCollection from '../user/collection';

const router = express.Router();

/**
 * Create a Vibe.
 *
 * @name POST /api/Vibes
 *
 * @param {string} username - the user
 * @param {string} resident - the username of the resident
 * @param {string} dateScheduled - the date that the Vibe is scheduled for
 * @return {VibeResponse} - The created Vibe
 * @throws {403} - If there is a user already logged in
 * @throws {404} - if name, city, state of a neighborhood is not a recognized neighborhood
 * @throws {400} - If title of Vibe or videoVibe is not properly formatted string
 *
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.isNeighborhoodExists,
      VibeValidator.areInfoValid,
    ],
    async (req: Request, res: Response) => {
        const username = req.body.username as string;
        const resident = req.body.resident as string;
        const dateScheduled = req.body.dateScheduled as string;

        const vibeLink = ""; // TODO: random google meet link


        const userObj = await UserCollection.findOneByUsername(username);
        const residentObj = await UserCollection.findOneByUsername(resident);
        const Vibe = await VibeCollection.addVibe(userObj.id, residentObj.id, vibeLink, new Date(dateScheduled));
        res.status(201).json({
            message: `Vibe was created successfully`,
            user: util.constructVibeResponse(Vibe)
        });
    }
  );

/**
 * Add an availability.
 *
 * @name POST /api/Vibes/addAvailability
 *
 * @param {string} username - the user
 * @param {string} resident - the username of the resident
 * @param {string} dateScheduled - the date that the Vibe is scheduled for
 * @return {VibeResponse} - The created Vibe
 * @throws {403} - If there is a user already logged in
 * @throws {404} - if name, city, state of a neighborhood is not a recognized neighborhood
 * @throws {400} - If title of Vibe or videoVibe is not properly formatted string
 *
 */
 router.post(
    '/addAvailability',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.isNeighborhoodExists,
      VibeValidator.isAvailabilityInfoValid,
    ],
    async (req: Request, res: Response) => {
        const username = req.body.username as string;
        const date = req.body.date as string;
        
        const dateObj = new Date(date);
        const userObj = await UserCollection.findOneByUsername(username);
        const Vibe = await VibeCollection.addAvailability(userObj.id, dateObj);
        res.status(201).json({
            message: `Availability was created successfully`,
            user: util.constructVibeResponse(Vibe)
        });
    }
  );


/**
 * Delete an availability.
 *
 * @name POST /api/Vibes/deleteAvailability
 *
 * @param {string} username - the user
 * @param {string} resident - the username of the resident
 * @param {string} dateScheduled - the date that the Vibe is scheduled for
 * @return {VibeResponse} - The created Vibe
 * @throws {403} - If there is a user already logged in
 * @throws {404} - if name, city, state of a neighborhood is not a recognized neighborhood
 * @throws {400} - If title of Vibe or videoVibe is not properly formatted string
 *
 */
 router.delete(
    '/deleteAvailability',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.isNeighborhoodExists,
      VibeValidator.isAvailabilityInfoValid,
    ],
    async (req: Request, res: Response) => {
        const username = req.body.username as string;
        const date = req.body.date as string;
        
        const dateObj = new Date(date);
        const userObj = await UserCollection.findOneByUsername(username);
        await VibeCollection.deleteAvailabilty(userObj.id, dateObj);
        res.status(200).json({
            message: `Availability was deleted successfully`,
        });
    }
  );


/**
 * Delete a Vibe.
 *
 * @name DELETE /api/Vibes/:VibeId?
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If Vibe with VibeId doesn't exist
 */
 router.delete(
    '/:VibeId?',
    [
      userValidator.isUserLoggedIn,
      VibeValidator.isVibeExists,
    ],
    async (req: Request, res: Response) => {
      await VibeCollection.deleteOneById(req.params.VibeId);
      res.status(200).json({
        message: 'The Vibe has been deleted successfully.'
      });
    }
  );


/**
 * Get all the Vibe of the currently signed in user
 *
 * @name GET /api/Vibes
 *
 * @return {VibeResponse} - All the Vibes of the signed in user
 * @throws {403} - If the user is not logged in
 */
 router.get(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const Vibes = await VibeCollection.findAllByUserId(req.session.userId);
        const response = Vibes.map(util.constructVibeResponse);
        res.status(200).json({
            message: `Vibes were found`,
            Vibes: response
        });
    }
  );



export { router as VibeRouter };