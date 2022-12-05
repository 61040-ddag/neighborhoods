import type { Request, Response } from 'express';
import express from 'express';
import CertifiedResidencyCollection from './collection';
import UserCollection from '../user/collection';
import NeighborhoodCollection from '../neighborhood/collection';
import * as certifiedResidencyValidator from '../certifiedResidency/middleware';
import * as neighborhoodValidator from '../neighborhood/middleware';
import * as userValidator from '../user/middleware';
import * as util from './util';
import { formatWord } from '../neighborhood/util';

const router = express.Router();

/**
 * @name GET /api/certifiedResidency/isCertified?user=username&neighborhoodId=neighborhoodId
 * 
 * @return {Boolean} - Whether or not a user is a resident of neighborhood
 * @throws {400} - If user is not given or neighborhoodId is not given
 * @throws {403} - If the user is not logged in
 * @throws {404} - If no user has given username or neighborhoodId of a neighborhood is not a recognized neighborhood
 */
 router.get(
    '/isCertified',
    [
        userValidator.isUserLoggedIn,
        certifiedResidencyValidator.isUserExists,
        certifiedResidencyValidator.isNeighborhoodExistsById
    ],
    async (req: Request, res: Response) => {
        const userId = (await UserCollection.findOneByUsername(req.query.user as string))._id;
        const neighborhoodId = req.query.neighborhoodId as string;

        const certifiedResidency = await CertifiedResidencyCollection.findOneByUserandNeighborhood(userId, neighborhoodId);
        const response = certifiedResidency ? true : false;
        res.status(200).json(response);
    }
);

/**
 * @name GET /api/certifiedResidency/users?user=username
 * 
 * @return {CertifiedResidencyResponse[]} - An array of neighborhoods an user is a resident in
 * @throws {400} - If user is not given
 * @throws {403} - If the user is not logged in
 * @throws {404} - If no user has given username
 */
router.get(
    '/users',
    [
        userValidator.isUserLoggedIn,
        certifiedResidencyValidator.isUserExists
    ],
    async (req: Request, res: Response) => {
        const user = await UserCollection.findOneByUsername(req.query.user as string);
        const certifiedResidences = await CertifiedResidencyCollection.findAllByUserId(user._id);
        const response = certifiedResidences.map(util.constructCertifiedResidencyResponse);
        res.status(200).json(response);
    }
);

/**
 * @name GET /api/certifiedResidency/neighborhoods?name=name&city=city&state=state
 * 
 * @return {CertifiedResidencyResponse[]} - An array of certified residents in a neighborhood
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

        const certifiedResidences = await CertifiedResidencyCollection.findAllByNeighborhoodId(neighborhood._id);
        const response = certifiedResidences.map(util.constructCertifiedResidencyResponse);
        res.status(200).json(response);
    }
);

/**
 * @name POST /api/certifiedResidency
 * 
 * @return {CertifiedResidencyResponse} - The created certifiedResidency
 * @param {string} name - The name of the neighborhood
 * @param {string} city - The city of the neighborhood's location
 * @param {string} state - The state of the neighborhood's location
 * 
 * @throws {400} - If any neighborhood information provided is in the wrong format
 * @throws {403} - If user is not logged in
 * @throws {409} - If neighborhood already exists
 */
router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
        certifiedResidencyValidator.isNeighborhoodAlreadyExists
    ],

    async (req: Request, res: Response) => {
        const name = req.body.name;
        const city = req.body.city;
        const state = req.body.state;
        const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);
        const neighborhoodId = neighborhood._id;
        const userId = req.session.userId;

        const certifiedResidency = await CertifiedResidencyCollection.addResident(userId, neighborhoodId);
        res.status(201).json({
            message: `You are successfully added as a certified resident for  ${formatWord(neighborhood.name)}, ${formatWord(neighborhood.city)}, ${neighborhood.state.toUpperCase()}.`,
            certifiedResidency: util.constructCertifiedResidencyResponse(certifiedResidency)
        });
    }
);



/**
 * @name DELETE /api/certifiedResidency/:certifiedResidencyId
 * 
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the certifiedResidencyId is not valid
 */
router.delete(
    '/:certifiedResidencyId?',
    [
        userValidator.isUserLoggedIn,
        certifiedResidencyValidator.isCertifiedResidencyExists
    ],
    async (req: Request, res: Response) => {
        await CertifiedResidencyCollection.deleteOneById(req.params.certifiedResidencyId);
        res.status(200).json({
            message: `You have successfully deleted your residency!`
        });
    }
);

export { router as certifiedResidencyRouter };