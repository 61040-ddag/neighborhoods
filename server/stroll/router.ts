import type { Request, Response } from 'express';
import express from 'express';
import NeighborhoodCollection from '../neighborhood/collection';
import StrollCollection from './collection';
import * as userValidator from '../user/middleware';
import * as strollValidator from './middleware';
import * as neighborhoodValidator from '../neighborhood/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a stroll.
 *
 * @name POST /api/strolls
 *
 * @param {string} name - the name of the neighborhood to which we are adding
 * @param {string} city - the city of the neighborhood to which we are adding
 * @param {string} state - the state of the neighborhood to which we are adding
 * @param {string} strollVideo - the link of the stroll video to the firebase storage
 * @param {string} title - the title of the stroll
 * @return {strollResponse} - The created stroll
 * @throws {403} - If there is a user already logged in
 * @throws {404} - if name, city, state of a neighborhood is not a recognized neighborhood
 * @throws {400} - If title of stroll or videoStroll is not properly formatted string
 *
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.isNeighborhoodExistsBodyName,
      strollValidator.areInfoValid,
    ],
    async (req: Request, res: Response) => {
        const name = req.body.name as string;
        const city = req.body.city as string;
        const state = req.body.state as string;
        const userId = req.session.userId;
        const title = req.body.title;
        const strollVideo = req.body.strollVideo;
        const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state); // will return a nbhood
        console.log(neighborhood);
        const stroll = await StrollCollection.addOne(userId, neighborhood._id, title, strollVideo);
        res.status(201).json({
            message: `Stroll was created successfully`,
            user: util.constructStrollResponse(stroll)
        });
    }
  );


/**
 * Delete a stroll.
 *
 * @name DELETE /api/strolls/:strollId?
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If stroll with strollId doesn't exist
 */
 router.delete(
    '/:strollId?',
    [
      userValidator.isUserLoggedIn,
      strollValidator.isStrollExists,
    ],
    async (req: Request, res: Response) => {
      await StrollCollection.deleteOneById(req.params.strollId);
      res.status(200).json({
        message: 'The stroll has been deleted successfully.'
      });
    }
  );


/**
 * Get all the stroll of the neighborhood with neighborhoodId
 *
 * @name GET /api/strolls/:neighborhoodId?
 *
 * @return {StrollResponse} - The neighborhood with given neighborhoodId
 * @throws {403} - If the user is not logged in
 * @throws {404} - if no neighborhood with neighborhoodId exists
 */
 router.get(
    '/:neighborhoodId?',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.isNeighborhoodExistsById
    ],
    async (req: Request, res: Response) => {
        const neighborhoodId = req.params.neighborhoodId;
        const strolls = await StrollCollection.findAllByNeighborhoodId(neighborhoodId, req.session.userId);
        const response = strolls.map(util.constructStrollResponse);
        res.status(200).json({
            message: `Strolls were found`,
            strolls: response
        });
    }
  );


/**
 * Get all the stroll of the currently signed in user
 *
 * @name GET /api/strolls
 *
 * @return {StrollResponse} - All the strolls of the signed in user
 * @throws {403} - If the user is not logged in
 */
 router.get(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        const strolls = await StrollCollection.findAllByUserId(req.session.userId);
        const response = strolls.map(util.constructStrollResponse);
        res.status(200).json({
            message: `Strolls were found`,
            strolls: response
        });
    }
  );



export { router as strollRouter };
