import type { Request, Response } from 'express';
import express from 'express';
import { AvailabilityCollection, VibeCollection } from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as vibeValidator from './middleware';
import * as neighborhoodValidator from '../neighborhood/middleware';
import * as util from './util';


const router = express.Router();

/**
 * Get all the vibe of the neighborhood
 *
 * @name GET /api/vibe
 *
 * @return {AvailabilityResponse[]} - All vibes of a user
 * @throws {403} - If the user is not logged in
 */
 router.get(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
      const userId = req.session.userId;
      const vibes = await VibeCollection.findAllByUserId(userId);
      const response = vibes.map(util.constructVibeResponse);
      res.status(200).json({
        message: `All vibes were found`,
        Vibes: response
      });
    }
  );


/**
 * Create a Vibe.
 *
 * @name POST /api/vibe
 *
 * @param {string} residentId - the username of the resident
 * @param {string} availabilityId - the date that the Vibe is scheduled for
 * @return {VibeResponse} - The created Vibe
 * @throws {403} - If user is not logged in
 * @throws {404} - if userId or residentId or availability Id or link don't exist
 *
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    vibeValidator.isVibeValid,
  ],
  async (req: Request, res: Response) => {
    const userId = req.session.userId;
    const residentId = req.body.residentId;
    const availabilityId = req.body.availabilityId;
    const vibe = await VibeCollection.addVibe(userId, residentId, availabilityId);

    res.status(201).json({
      message: `Vibe was created successfully`,
      user: util.constructVibeResponse(vibe)
    });
  }
);


/**
 * Delete an vibe.
 *
 * @name DELETE api/vibe/vibe:vibeId
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If vibe with vibeId doesn't exist or information invalid
 */
 router.delete(
    '/:vibeId?',
    [
      userValidator.isUserLoggedIn,
      vibeValidator.isVibeExists,
      vibeValidator.isVibeBelongToUser,
      vibeValidator.isVibeValid
    ],
    async (req: Request, res: Response) => {
        const vibeId = req.params.vibeId;
        await VibeCollection.deleteOneById(vibeId);
        res.status(200).json({
        message: 'The vibe has been deleted successfully.'
        });
    }
  );

/////////////////////////////// Availability Routes ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/**
 * Get all the availability of the neighborhood
 *
 * @name GET /api/vibe/availability?neighborhoodId=neighborhoodId
 *
 * @return {AvailabilityResponse[]} - All availability of a neighborhood
 * @throws {400} - If neighborhoodId is not given
 * @throws {403} - If the user is not logged in
 * @throws {404} - If neighborhoodId of a neighborhood is not a recognized neighborhood
 */
router.get(
  '/availability',
  [
    userValidator.isUserLoggedIn,
    vibeValidator.isNeighborhoodExistsById
  ],
  async (req: Request, res: Response) => {
    const neighborhoodId = req.query.neighborhoodId as string;
    const availabilities = await AvailabilityCollection.findAllByNeighborhoodId(neighborhoodId);
    console.log(availabilities)
    const response = availabilities.map(util.constructAvailabilityResponse);
    res.status(200).json({
      message: `All availabilities were found.`,
      availabilities: response
    });
  }
);

/**
 * Add an availability.
 *
 * @name POST /api/vibe/availability
 *
 * @param {string} neighborhoodId - the id of the neighborhood
 * @param {string} vibeLink - The video link of the vibe interview
 * @param {string} dateTime - the date and time that the availability is scheduled for
 * @return {AvailabilityResponse} - The created availability
 * @throws {403} - If there is a user already logged in
 * @throws {404} - if neighborhoodId is not a recognized neighborhood
 * @throws {409} - If date and time already exist
 */
router.post(
  '/availability',
  [
    userValidator.isUserLoggedIn,
    // vibeValidator.isNeighborhoodExistsById,
    // vibeValidator.isDateTimeAlreadyExists
  ],
  async (req: Request, res: Response) => {
    const userId = req.session.userId as string;
    const neighborhoodId = req.body.neighborhoodId;
    const vibeLink = req.body.vibeLink;
    console.log(vibeLink);
    const dateTime = req.body.dateTime;

    const availability = await AvailabilityCollection.addOne(userId, neighborhoodId, vibeLink, dateTime);
    res.status(201).json({
      message: `Availability was created successfully`,
      availability: util.constructAvailabilityResponse(availability)
    });
  }
);

/**
 * Delete an availability.
 *
 * @name DELETE api/vibe/availability:availabilityId
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If availability with availabilityId doesn't exist
 */
router.delete(
  '/availability/:availabilityId?',
  [
    userValidator.isUserLoggedIn,
    vibeValidator.isAvailabilityExists
  ],
  async (req: Request, res: Response) => {
    await AvailabilityCollection.deleteOneById(req.params.availabilityId);
    res.status(200).json({
      message: 'The availability has been deleted successfully.'
    });
  }
);

export { router as vibeRouter };