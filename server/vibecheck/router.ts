import type { Request, Response } from 'express';
import express from 'express';
import { AvailabilityCollection, VibeCheckCollection } from './collection';
import * as userValidator from '../user/middleware';
import * as vibeCheckValidator from './middleware';
import * as util from './util';


const router = express.Router();

/**
 * Get all the vibe check of a user
 *
 * @name GET /api/vibeCheck
 *
 * @return {VibeCheckResponse[]} - All vibe checks of a user
 * @throws {403} - If the user is not logged in
 */
 router.get(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
      const userId = req.session.userId;
      const vibeChecks = await VibeCheckCollection.findAllByUserId(userId);
      const response = vibeChecks.map(util.constructVibeCheckResponse);
      res.status(200).json({
        message: `All vibe checks were found`,
        vibeChecks: response
      });
    }
  );


/**
 * Create a vibe check.
 *
 * @name POST /api/vibeCheck
 *
 * @param {string} availabilityId - The id of the availability of the desired resident
 * @return {VibeCheckResponse} - The created vibe check
 * @throws {400} - If availabilityId is missing
 * @throws {403} - If user is not logged in
 * @throws {404} - If availabilityId does not exist
 *
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    vibeCheckValidator.isVibeCheckValid,
  ],
  async (req: Request, res: Response) => {
    const userId = req.session.userId;
    const availabilityId = req.body.availabilityId;
    const vibeCheck = await VibeCheckCollection.addOne(userId, availabilityId);

    res.status(201).json({
      message: `Vibe check was created successfully`,
      user: util.constructVibeCheckResponse(vibeCheck)
    });
  }
);


/**
 * Delete an vibe check
 *
 * @name DELETE /api/vibeCheck/:vibeCheckId
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If vibe check with vibeCheckId does not exist
 */
 router.delete(
    '/:vibeCheckId?',
    [
      userValidator.isUserLoggedIn,
      vibeCheckValidator.isVibeCheckExists,
      vibeCheckValidator.isVibeCheckBelongToUser,
    ],
    async (req: Request, res: Response) => {
        const vibeCheckId = req.params.vibeCheckId;
        await VibeCheckCollection.deleteOneById(vibeCheckId);
        res.status(200).json({
        message: 'The vibe check has been deleted successfully.'
        });
    }
  );

/////////////////////////////// Availability Routes ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////


/**
 * Get all the availability of the neighborhood
 *
 * @name GET /api/vibeCheck/availability?neighborhoodId=neighborhoodId
 *
 * @return {AvailabilityResponse[]} - All availabilities of a neighborhood
 * @throws {400} - If neighborhoodId is not given
 * @throws {403} - If the user is not logged in
 * @throws {404} - If neighborhoodId of a neighborhood is not a recognized neighborhood
 */
router.get(
  '/availability',
  [
    userValidator.isUserLoggedIn,
    vibeCheckValidator.isNeighborhoodExistsById
  ],
  async (req: Request, res: Response) => {
    const neighborhoodId = req.query.neighborhoodId as string;
    const availabilities = await AvailabilityCollection.findAllByNeighborhoodId(neighborhoodId);
    
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
 * @name POST /api/vibeCheck/availability
 *
 * @param {string} neighborhoodId - The id of the neighborhood
 * @param {string} videoLink - The video link of the meeting
 * @param {string} dateTime - The date and time that the availability is scheduled for
 * @return {AvailabilityResponse} - The created availability
 * @throws {403} - If the user is not logged in
 * @throws {404} - If neighborhoodId is not a recognized neighborhood
 * @throws {409} - If date and time already exist
 */
router.post(
  '/availability',
  [
    userValidator.isUserLoggedIn,
    vibeCheckValidator.isNeighborhoodExistsByIdBody,
    vibeCheckValidator.isDateTimeAlreadyExists
  ],
  async (req: Request, res: Response) => {
    const userId = req.session.userId as string;
    const neighborhoodId = req.body.neighborhoodId;
    const videoLink = req.body.videoLink;
    const dateTime = req.body.dateTime;

    const availability = await AvailabilityCollection.addOne(userId, neighborhoodId, videoLink, dateTime);
    res.status(201).json({
      message: `Availability was created successfully`,
      availability: util.constructAvailabilityResponse(availability)
    });
  }
);

/**
 * Delete an availability.
 *
 * @name DELETE /api/vibeCheck/availability/:availabilityId
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If availability with availabilityId does not exist
 */
router.delete(
  '/availability/:availabilityId?',
  [
    userValidator.isUserLoggedIn,
    vibeCheckValidator.isAvailabilityExists
  ],
  async (req: Request, res: Response) => {
    await AvailabilityCollection.deleteOneById(req.params.availabilityId);
    res.status(200).json({
      message: 'The availability has been deleted successfully.'
    });
  }
);

export { router as vibeRouter };