import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { VibeCheckCollection, AvailabilityCollection } from './collection';
import UserCollection from '../user/collection';
import NeighborhoodCollection from '../neighborhood/collection';


/**
 * Checks if a vibe check is valid
 */
const isVibeCheckValid = async (req: Request, res: Response, next: NextFunction) => {
    if (!(req.body.availabilityId)) {
        res.status(404).json({
            error: `Missing information in vibe check.`
        });
        return;
    }

    const availability = await AvailabilityCollection.findOne(req.body.availabilityId);
    if (!availability) {
        res.status(404).json({
            error: `Availability with ID ${req.body.availabilityId} does not exist.`
        });
        return;
    }

    next();
};

/**
 * Checks if a isVibeExists with vibeId is req.params exists
 */
const isVibeCheckExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.vibeCheckId);
    const vibeCheck = validFormat ? await VibeCheckCollection.findOneById(req.params.vibeCheckId) : '';
    if (!vibeCheck) {
        res.status(404).json({
            error: `Vibe check with ID ${req.params.vibeCheckId} does not exist.`
        });
        return;
    }

    next();
};

const isVibeCheckBelongToUser = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.vibeCheckId);
    const vibeCheck = validFormat ? await VibeCheckCollection.findOneByIdAndUserId(req.params.vibeCheckId, req.session.userId) : '';
    if (!vibeCheck) {
        res.status(406).json({
            error: `Vibe check with ID ${req.params.vibeCheckId} does not belong to user.`
        });
        return;
    }

    next();
};

//////////////////////////////////// Availability Middleware ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////



/**
 * Checks if a isAvailabilityExists with availabilityId is req.params exists
 */
const isAvailabilityExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.availabilityId);
    const availability = validFormat ? await AvailabilityCollection.findOne(req.params.availabilityId) : '';

    if (!availability) {
        res.status(404).json({
            error: `Availability with ID ${req.params.availabilityId} does not exist.`
        });
        return;
    }

    next();
};

const isNeighborhoodExistsById = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.query.neighborhoodId as string);
    const neighborhood = validFormat ? await NeighborhoodCollection.findOneById(req.query.neighborhoodId as string) : '';

    if (!neighborhood) {
        res.status(404).json({
            error: `Neighborhood with neighborhood ID ${req.query.neighborhoodId as string} does not exist.`
        });
        return;
    }
    next();
}

const isNeighborhoodExistsByIdBody = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.body.neighborhoodId as string);
    const neighborhood = validFormat ? await NeighborhoodCollection.findOneById(req.body.neighborhoodId as string) : '';

    if (!neighborhood) {
        res.status(404).json({
            error: `Neighborhood with neighborhood ID ${req.body.neighborhoodId as string} does not exist.`
        });
        return;
    }
    next();
}

const isDateTimeAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const dateTime = req.body.dateTime;

    const availabilites = await AvailabilityCollection.findAllByUserId(req.session.userId as string);

    const result = availabilites.map(availability => availability.dateTime);

    if (result.includes(dateTime)) {
        res.status(409).json({
            error: `You are already schedule an availability ${dateTime}.`
        });
        return;
    }
    next();
};

export {
    isAvailabilityExists,
    isNeighborhoodExistsById,
    isNeighborhoodExistsByIdBody,
    isDateTimeAlreadyExists,
    isVibeCheckBelongToUser,
    isVibeCheckExists,
    isVibeCheckValid
};