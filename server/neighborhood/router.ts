import type { Request, Response } from 'express';
import express from 'express';
import NeighborhoodCollection from './collection';
import * as neighborhoodValidator from './middleware';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();


/**
 * Create a neighborhood.
 *
 * @name POST /api/neighborhoods
 *
 * @param {string} name - the name of the neighborhood
 * @param {string} city - the city the neighborhood is in
 * @param {string} state - the state the neighborhood is in
 * @param {number} latitude - the latitude of the neighborhood
 * @param {number} longitude - the longitude of the neighborhood
 * @param {number} crimeRate - the crimeRate of the neighborhood
 * @param {number} averatePrice - the averatePrice of the neighborhood
 * @param {number} averageAge - the averageAge of the neighborhood
 * @return {NeighborhoodResponse} - The created neighborhood
 * @throws {403} - If user is not logged in
 * @throws {409} - If neighborhood already exists
 * @throws {401} - If user making the request is not the admin
 * @throws {400} - if any information provided is invalid
 *
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.isUserAdmin,
      neighborhoodValidator.isCreateInfoValid,
      neighborhoodValidator.isNeighborhoodAlreadyExists,
    ],
    async (req: Request, res: Response) => {
      const neighborhood = await NeighborhoodCollection.addOne(req.body.name, req.body.city, req.body.state, req.body.latitude, req.body.longitude, req.body.crimeRate, req.body.averagePrice, req.body.averageAge);
      res.status(201).json({
        message: `Neighborhood ${neighborhood.name} was created successfully`,
        user: util.constructNeighborhoodResponse(neighborhood)
      });
    }
  );


/**
 * Get the a neighborhood with neighborhood with name city state
 *
 * @name GET /api/neighborhoods?name=name&city=city&state=state
 *
 * @return - the neighborhodd with neighborhoodId
 * @throws {404} - neighborhood with neighborhood name, city, state doesn't exist
 * @throws {403} - user is not logged in
*/
 router.get(
    '',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.isNeighborhoodExists
    
    ],
    async (req: Request, res: Response) => {
      const neighborhood = await NeighborhoodCollection.findOneByName(req.query.name as string, req.query.city as string, req.query.state as string);
      res.status(200).json({
        message: 'Your session info was found successfully.',
        neighborhood: util.constructNeighborhoodResponse(neighborhood)
      });
    }
  );

/**
 * Get all the neighborhoods within bounds lat1, lat2, long1, long2
 *
 * @name GET /api/neighborhoods?lat1=lat1&long1=long1&lat2=lat2&long2=long2
 *
 * @return - all the neighborhoods within the bounds
 * @throws {403} - user is not logged in
 * @throws {406} - one or more of lat1, lat2, long1, long2, are invalid
*/
 router.get(
    '',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.areCoordinatesValid
    ],
    async (req: Request, res: Response) => {
        const allFreets = await NeighborhoodCollection.findAllInBox(Number(req.query.lat1), Number(req.query.long1), Number(req.query.lat2), Number(req.query.long2));
        const response = allFreets.map(util.constructNeighborhoodResponse);
        res.status(200).json(response);
    }
  );


/**
 * Delete a neighborhood.
 *
 * @name DELETE /api/neighborhoods/?name=name&city=city&state=state'
 *
 * @return {string} - A success message
 * @throws {401} - If user making the request is not the admin
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the neighborhood doesn't exist
 */
router.delete(
    '',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.isUserAdmin,
      neighborhoodValidator.isNeighborhoodExists
    ],
    async (req: Request, res: Response) => {
      const neighborhood = (req.params.neighborhood as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
      await NeighborhoodCollection.deleteOneByName(req.query.name as string, req.query.city as string, req.query.state as string);
      res.status(200).json({
        message: 'Neighborhood has been deleted successfully'
      });
    }
  );


/**
 * Update a neighborhoods information
 *
 * @name PATCH /api/neighborhoods?name=name&city=city&state=state
 *
 * @param {string} CrimeRate - the new crimeRate
 * @param {string} averageAge - the new averageAge
 * @param {string} averagePrice - the new averagePrice
 * @return {UserResponse} - The updated user
 * @throws {403} - If user is not logged in
 * @throws {401} - If user is not admin
 * @throws {400} - If updated info are not int the correct format
 * @throws {404} - neighborhood  does not exist
 */
router.patch(
    '/',
    [
      userValidator.isUserLoggedIn,
      neighborhoodValidator.isUserAdmin,
      neighborhoodValidator.isUpdatedInfoValid,
    ],
    async (req: Request, res: Response) => {
      const neighborhood = await NeighborhoodCollection.updateOne(req.query.name as string, req.query.city as string, req.query.state as string, {crimeRate: req.body.crimeRate, averagePrice: req.body.averagePrice, averageAge: req.body.averageAge});
      res.status(200).json({
        message: 'Neighborhood was updated successfully',
        user: util.constructNeighborhoodResponse(neighborhood)
      });
    }
  );

export { router as neighborhoodRouter };