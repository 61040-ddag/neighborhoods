import type { Request, Response, NextFunction } from 'express';
import NeighborhoodCollection from '../neighborhood/collection';

const isNeighborhoodAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name as string;
    const city = req.query.city as string;
    const state = req.query.state as string;
    
    const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);
    if (neighborhood) {
        res.status(409).json({
            error: `This neighborhood ${neighborhood.name} already exists.`
        });
        return;
    }
    next();
};

const isNeighborhoodExists = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name as string;
    const city = req.query.city as string;
    const state = req.query.state as string;
    
    const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);
    if (!neighborhood) {
        res.status(404).json({
            error: `This neighborhood ${name} does not exists.`
        });
        return;
    }
    next();
};

const isBoundsValid = async (req: Request, res: Response, next: NextFunction) => {
    const lat1 = req.query.lat1;
    const long1 = req.query.long1;
    const lat2 = req.query.lat2;
    const long2 = req.query.long2;

    if (!lat1 || !lat2 || !long1 || !long2) {
        res.status(400).json({
            error: "Missing input coordinates."
        });
        return;
    }

    try {
        Number(lat1);
        Number(lat2);
        Number(long1);
        Number(long2);
    } catch {
        res.status(400).json({
            error: "The input coordinates given are not numbers."
        });
        return;
    }

    if (!(lat1 < lat2)) {
        res.status(400).json({
            error: 'Latitude 1 must be less than Latitude 2.'
        });
        return;
    }

    if (!(long1 < long2)) {
        res.status(400).json({
            error: 'Longitude 1 must be less than Longitude 2.'
        });
        return;
    }

    next();
};

const isCreateInfoValid = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name;
    const city = req.body.city;
    const state = req.body.state;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const crimeRate = req.body.crimeRate;
    const averagePrice = req.body.averagePrice;
    const averageAge = req.body.averageAge;
    const stringRegex = /^\S+$/;

    if (!(stringRegex.test(name) && stringRegex.test(city) && stringRegex.test(state))) {
        res.status(400).json({
            error: "Neighborhood meta data needs to be nonempty."
        });
        return;
    }
    
    if (!(latitude && longitude && crimeRate && averageAge && averagePrice)) {
        res.status(400).json({
            error: "Missing residential data."
        });
        return;
    }

    try {
        Number(latitude);
        Number(longitude);
        Number(crimeRate);
        Number(averageAge);
        Number(averagePrice);
    } catch {
        res.status(400).json({
            error: "Residential data given are not numbers."
        });
        return;
    }

    next();
};

const isUpdatedInfoValid = async (req: Request, res: Response, next: NextFunction) => {
    const crimeRate = req.body.crimeRate;
    const averagePrice = req.body.averagePrice;
    const averageAge = req.body.averageAge;

    if (!crimeRate || !averageAge || !averagePrice) {
        res.status(400).json({
            error: "Updated residential data must be nonempty."
        });
        return;
    }
    try {
        Number(crimeRate);
        Number(averageAge);
        Number(averagePrice);
    } catch {
        res.status(400).json({
            error: "Residential data given are not numbers."
        });
        return;
    }

    next();
};


export {
    isCreateInfoValid,
    isNeighborhoodAlreadyExists,
    isNeighborhoodExists,
    isBoundsValid,
    isUpdatedInfoValid,
};
