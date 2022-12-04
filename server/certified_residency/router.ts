import type { Request, Response } from 'express';
import express from 'express';
import CertifiedResidencyCollection from './collection';
import NeighborhoodCollection from '../neighborhood/collection';
import * as neighborhoodValidator from '../neighborhood/middleware';
import * as userValidator from '../user/middleware';
import * as util from './util';

const router = express.Router();

/**
 * @name POST /api/certifiedResidency
 * 
 * @param {string} name - The name of the neighborhood
 * @param {string} city - The city of the neighborhood's location
 * @param {string} state - The state of the neighborhood's location
 * 
 * @throws {400} - If any neighborhood information provided is in the wrong format
 * @throws {403} - If user is not logged in
 */
router.post(
    '/',
    
    [
        userValidator.isUserLoggedIn,
        neighborhoodValidator.isNeighborhoodExists
    ],
    
    async (req: Request, res: Response) => {
        const name = req.body.name;
        const city = req.body.city;
        const state = req.body.state;
        const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);
        const neighborhoodId = neighborhood._id;
        const userId = req.session.userId;

        const certified_residency = await CertifiedResidencyCollection.addResident(userId, neighborhoodId);
        res.status(201).json({
            message: `You are successfully added as a certified resident for  ${name}, ${city}, ${state}.`,
            certified_residency: util.constructCertifiedResidencyResponse(certified_residency)
          });
    }
)

/**
 * @name GET /api/certifiedResidency
 * 
 * @throws {403} - If user is not logged in
 */
router.get(
    '/',

    [
        userValidator.isUserLoggedIn
    ],

    async (req: Request, res: Response) => {
        const userId = req.session.userId;
        const certified_residency_array = await CertifiedResidencyCollection.findAllByUserId(userId);
        const response = certified_residency_array.map(util.constructCertifiedResidencyResponse);
        res.status(200).json(response);
    }
)

/**
 * @name DELETE /api/certifiedResidency?name=name&city=city&state=state
 * 
 * @return {string} - A success message
 * 
 * @throws {403} - If the user is not logged in
 * @throws {404} - If name, city, state of a neighborhood is not a recognized neighborhood
 */
router.delete(
    '/',
    [
        userValidator.isUserLoggedIn,
        neighborhoodValidator.isNeighborhoodExists
    ],
    async (req: Request, res: Response) => {
        const userId = req.session.userId;
        
        const name = req.body.name;
        const city = req.body.city;
        const state = req.body.state;
        const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);
        const neighborhoodId = neighborhood._id;

        await CertifiedResidencyCollection.deleteOneById(userId, neighborhoodId);
        res.status(200).json({
            message: `You have successfully deleted your residency in ${name}, ${city}, ${state}`
        });
    }
)

export { router as certifiedresidencyRouter };