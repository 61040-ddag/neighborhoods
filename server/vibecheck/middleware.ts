import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { VibeCollection, AvailabilityCollection } from './collection';
import NeighborhoodCollection from '../neighborhood/collection';


/**
 * Checks if a vibe is valid
 */
 const isVibeValid = async (req: Request, res: Response, next: NextFunction) => {
    if (!(req.body.residentId || req.body.vibeLink || req.body.availabilityId)) {
        res.status(404).json({
            error: `Entered invalid information`
        });
        return;
    }

    next();
};

/**
 * Checks if a isVibeExists with vibeId is req.params exists
 */
 const isVibeExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.vibeId);
    const vibe = validFormat ? await VibeCollection.findOneById(req.params.vibeId) : '';
    if (!vibe) {
        res.status(404).json({
            error: `Vibe with ID ${req.params.vibeId} does not exist.`
        });
        return;
    }

    next();
};

const isVibeBelongToUser = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.vibeId);
    const vibe = validFormat ? await VibeCollection.findOneByIdAndUserId(req.params.vibeId, req.session.userId) : '';
    if (!vibe) {
        res.status(406).json({
            error: `Vibe with ID ${req.params.vibeId} does not belong to user.`
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
    console.log(availability)
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
    console.log(neighborhood)
    if (!neighborhood) {
        res.status(404).json({
            error: `Neighborhood with neighborhood ID ${req.query.neighborhoodId as string} does not exist.`
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
    isDateTimeAlreadyExists,
    isVibeBelongToUser,
    isVibeExists,
    isVibeValid
};