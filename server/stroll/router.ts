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
 * Get all the stroll of the currently signed in user
 *
 * @name GET /api/strolls/authors?author=username
 *
 * @return {StrollResponse} - All the strolls of the signed in user
 * @throws {400} - If author is not given
 * @throws {403} - If the user is not logged in
 * @throws {404} - If no user has given author
 */
router.get(
  '/authors',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const strolls = await StrollCollection.findAllByUsername(req.query.author as string);
    const response = strolls.map(util.constructStrollResponse);
    res.status(200).json({
      message: `Strolls were found`,
      strolls: response
    });
  }
);

/**
 * Get all the strolls of the neighborhood with neighborhoodId
 *
 * @name GET /api/strolls/neighborhoods?name=name&city=city&state=state
 *
 * @return {StrollResponse} - The neighborhood with given neighborhoodId
 * @throws {400} - If name, city or state is not given
 * @throws {403} - If the user is not logged in
 * @throws {404} - If name, city, state of a neighborhood is not a recognized neighborhood
 */
router.get(
  '/neighborhoods',
  [
    userValidator.isUserLoggedIn,
    neighborhoodValidator.isNeighborhoodExists
  ],
  async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const city = req.query.city as string;
    const state = req.query.state as string;

    const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);

    const strolls = await StrollCollection.findAllBylocation(neighborhood._id, req.session.userId);

    const response = strolls.map(util.constructStrollResponse);
    res.status(200).json({
      message: `Strolls were found`,
      strolls: response
    });
  }
);

/**
 * Create a stroll.
 *
 * @name POST /api/strolls
 *
 * @param {string} neighborhoodId - The id of the neighborhood of the stroll
 * @param {string} strollVideo - the link of the stroll video to the firebase storage
 * @param {string} title - the title of the stroll
 * @return {strollResponse} - The created stroll
 * @throws {403} - If the user is not logged in
 * @throws {404} - If no neighborhood with neighborhoodId exists
 * @throws {400} - If title of stroll or videoStroll is not properly formatted string
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    neighborhoodValidator.isNeighborhoodExistsById,
    strollValidator.areInfoValid,
  ],
  async (req: Request, res: Response) => {
    const userId = req.session.userId;
    const neighborhoodId = req.body.neighborhoodId;
    const title = req.body.title;
    const strollVideo = req.body.strollVideo;

    const stroll = await StrollCollection.addOne(userId, neighborhoodId, title, strollVideo);
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
 * @throws {404} - If the strollId is not valid
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

export { router as strollRouter };
