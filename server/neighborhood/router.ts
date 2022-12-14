import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import NeighborhoodCollection from './collection';
import ReviewCollection from '../review/collection';
import StrollCollection from '../stroll/collection';
import CertifiedResidencyCollection from '../certifiedResidency/collection';
import { AvailabilityCollection, VibeCheckCollection } from '../vibecheck/collection';
import * as neighborhoodValidator from './middleware';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();
/**
 * Get all the neighborhoods in the database
 *
 * @name GET /api/neighborhoods
 *
 * @return {NeighborhoodResponse[]} - An array of all the neighborhoods
 * @throws {403} - If the user is not logged in
*/
/**
 * Get the neighborhood with given name, city, and state
 *
 * @name GET /api/neighborhoods?name=name&city=city&state=state
 *
 * @return {NeighborhoodResponse} - The neighborhood with given name, city, and state
 * @throws {400} - If name, city or state is not given
 * @throws {403} - If the user is not logged in
 * @throws {404} - If name, city, state of a neighborhood is not a recognized neighborhood
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.name !== undefined && req.query.city !== undefined && req.query.state !== undefined) {
      next();
      return;
    }

    const allNeighborhoods = await NeighborhoodCollection.findAll();
    const response = allNeighborhoods.map(util.constructNeighborhoodResponse);
    res.status(200).json({
      message: 'All neighborhoods were found.',
      neighborhoods: response
    });
  },
  [
    userValidator.isUserLoggedIn,
    neighborhoodValidator.isNeighborhoodExists
  ],
  async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const city = req.query.city as string;
    const state = req.query.state as string;

    const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);
    res.status(200).json({
      message: `Neighborhood ${util.formatWord(neighborhood.name)}, ${util.formatWord(neighborhood.city)}, ${neighborhood.state.toUpperCase()} was found.`,
      neighborhood: util.constructNeighborhoodResponse(neighborhood)
    });
  }
);

/**
 * Get neighborhoods with given city, state
 *
 * @name GET /api/neighborhoods/location?city=city&state=state
 *
 * @return {NeighborhoodResponse} - The neighborhood with given name, city, and state
 * @throws {400} - If city or state is not given
 * @throws {403} - If the user is not logged in
 */
 router.get(
  '/location',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const city = req.query.city as string;
    const state = req.query.state as string;

    const neighborhoods = await NeighborhoodCollection.findAllByLocation(city, state);
    const response = neighborhoods.map(util.constructNeighborhoodResponse);
    res.status(200).json({
      message: `Neighborhoods in ${util.formatWord(city)}, ${state.toUpperCase()} was found.`,
      neighborhoods: response
    });
  }
);

/**
 * Create a new neighborhood
 *
 * @name POST /api/neighborhoods
 *
 * @param {string} name - The name of the neighborhood
 * @param {string} city - The city of the neighborhood's location
 * @param {string} state - The state of the neighborhood's location
 * @param {number} latitude - The latitude of the neighborhood's location
 * @param {number} longitude - The longitude of the neighborhood's location
 * @param {number} crimeRate - The crime rate in the neighborhood
 * @param {number} averatePrice - The average price of a home in the neighborhood
 * @param {number} averageAge - The average age of the residents in the neighborhood
 * @return {NeighborhoodResponse} - The created neighborhood
 * @throws {400} - If any neighborhood information provided is in the wrong format
 * @throws {401} - If user making the request is not the admin
 * @throws {403} - If user is not logged in
 * @throws {409} - If neighborhood already exists
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    userValidator.isUserAdmin,
    neighborhoodValidator.isCreateInfoValid,
    neighborhoodValidator.isNeighborhoodAlreadyExists,
  ],
  async (req: Request, res: Response) => {
    const name = req.body.name;
    const city = req.body.city;
    const state = req.body.state;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const crimeRate = req.body.crimeRate;
    const averagePrice = req.body.averagePrice;
    const averageAge = req.body.averageAge;

    const neighborhood = await NeighborhoodCollection.addOne(name, city, state, latitude, longitude, crimeRate, averagePrice, averageAge);
    res.status(201).json({
      message: `Neighborhood ${util.formatWord(neighborhood.name)}, ${util.formatWord(neighborhood.city)}, ${neighborhood.state.toUpperCase()} was created successfully.`,
      neighborhood: util.constructNeighborhoodResponse(neighborhood)
    });
  }
);

/**
 * Update a neighborhood's information
 *
 * @name PATCH /api/neighborhoods?name=name&city=city&state=state
 *
 * @param {number} crimeRate - The new crime rate in the neighborhood
 * @param {number} averatePrice - The new average price of a home in the neighborhood
 * @param {number} averageAge - The new average age of the residents in the neighborhood
 * @return {NeighborhoodResponse} - The updated neighborhood
 * @throws {400} - If name, city or state is not given
 * @throws {400} - Any updated neighborhood information is in the wrong format
 * @throws {401} - If user making the request is not the admin
 * @throws {403} - If user is not logged in
 * @throws {404} - If name, city, state of a neighborhood is not a recognized neighborhood
 */
router.patch(
  '/',
  [
    userValidator.isUserLoggedIn,
    userValidator.isUserAdmin,
    neighborhoodValidator.isNeighborhoodExists,
    neighborhoodValidator.isUpdatedInfoValid,
  ],
  async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const city = req.query.city as string;
    const state = req.query.state as string;
    const neighborhoodDetails = { crimeRate: req.body.crimeRate, averagePrice: req.body.averagePrice, averageAge: req.body.averageAge };

    const neighborhood = await NeighborhoodCollection.updateOne(name, city, state, neighborhoodDetails);
    res.status(200).json({
      message: `Neighborhood ${util.formatWord(neighborhood.name)}, ${util.formatWord(neighborhood.city)}, ${neighborhood.state.toUpperCase()} was updated successfully.`,
      neighborhood: util.constructNeighborhoodResponse(neighborhood)
    });
  }
);

/**
 * Delete a neighborhood
 *
 * @name DELETE /api/neighborhoods?name=name&city=city&state=state
 *
 * @return {string} - A success message
 * @throws {400} - If name, city or state is not given
 * @throws {401} - If user making the request is not the admin
 * @throws {403} - If the user is not logged in
 * @throws {404} - If name, city, state of a neighborhood is not a recognized neighborhood
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn,
    userValidator.isUserAdmin,
    neighborhoodValidator.isNeighborhoodExists
  ],
  async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const city = req.query.city as string;
    const state = req.query.state as string;

    const neighborhoodId = (await NeighborhoodCollection.findOneByInfo(name, city, state))._id;

    await NeighborhoodCollection.deleteOneByInfo(name, city, state);
    await ReviewCollection.deleteManyByLocation(neighborhoodId)
    await CertifiedResidencyCollection.deleteManyByLocation(neighborhoodId);
    await StrollCollection.deleteManyByLocation(neighborhoodId);
    const availabilites = await AvailabilityCollection.findAllByNeighborhoodId(neighborhoodId);
    await AvailabilityCollection.deleteManyByNeighborhood(neighborhoodId);
    for (const availability of availabilites) {
      await VibeCheckCollection.deleteOneByAvailabilityId(availability._id);
    }
    res.status(200).json({
      message: `Neighborhood ${util.formatWord(name)}, ${util.formatWord(city)}, ${state.toUpperCase()} has been deleted successfully.`
    });
  }
);

export { router as neighborhoodRouter };