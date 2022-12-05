import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import CertifiedResidencyCollection from '../certifiedResidency/collection';
import UserCollection from '../user/collection';
import NeighborhoodCollection from '../neighborhood/collection';
import { formatWord } from '../neighborhood/util';

/**
 * Checks if a certifiedResidency with certifiedResidencyId is req.params exists
 */
 const isCertifiedResidencyExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.certifiedResidencyId);
    const certifiedResidency = validFormat ? await CertifiedResidencyCollection.findOne(req.params.certifiedResidencyId) : '';
    if (!certifiedResidency) {
        res.status(404).json({
            error: `Certified Residency with ID ${req.params.certifiedResidencyId} does not exist.`
        });
        return;
    }

    next();
};

/**
 * Checks if a user with userId as user id in req.query exists
 */
const isUserExists = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.user) {
        res.status(400).json({
            error: 'Provided username must be nonempty.'
        });
        return;
    }

    const user = await UserCollection.findOneByUsername(req.query.user as string);
    if (!user) {
        res.status(404).json({
            error: `A user with username ${req.query.user as string} does not exist.`
        });
        return;
    }

    next();
};

const isNeighborhoodExistsById= async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.query.neighborhoodId as string);
    const neighborhood = validFormat ? await NeighborhoodCollection.findOneById(req.query.neighborhoodId as string) : '';
    console.log(neighborhood)
    if (!neighborhood) {
        res.status(404).json({
            error: `Neighborhood with neighborhood ID ${req.query.neighborhoodId as string} does not exist.`
        });
        return;
    }
    next();
}

const isNeighborhoodAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name as string;
    const city = req.body.city as string;
    const state = req.body.state as string;

    const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);

    if (!neighborhood) {
        res.status(404).json({
            error: `Neighborhood ${formatWord(name)}, ${formatWord(city)}, ${state.toUpperCase()} does not exists.`
        });
        return;
    }

    const residency = await CertifiedResidencyCollection.findOneByUserandNeighborhood(req.session.userId, neighborhood._id);

    if (residency) {
        res.status(409).json({
            error: `You are already a resident of Neighborhood ${formatWord(neighborhood.name)}, ${formatWord(neighborhood.city)}, ${neighborhood.state.toUpperCase()}.`
        });
        return;
    }
    next();
};
export {
    isCertifiedResidencyExists,
    isUserExists,
    isNeighborhoodExistsById,
    isNeighborhoodAlreadyExists
};