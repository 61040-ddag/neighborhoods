import type { Request, Response, NextFunction } from 'express';
import NeighborhoodCollection from '../neighborhood/collection';
import { formatWord } from './util';

const isNeighborhoodAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name as string;
    const city = req.body.city as string;
    const state = req.body.state as string;

    const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);
    if (neighborhood) {
        res.status(409).json({
            error: `Neighborhood ${formatWord(neighborhood.name)}, ${formatWord(neighborhood.city)}, ${neighborhood.state.toUpperCase()} already exists.`
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
            error: `Neighborhood ${formatWord(name)}, ${formatWord(city)}, ${state.toUpperCase()} does not exists.`
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
    const stringRegex = /^[A-Za-z_]*$/;

    if (!(stringRegex.test(name) && stringRegex.test(city) && stringRegex.test(state))) {
        res.status(400).json({
            error: "Neighborhood meta data needs all be nonempty alphabet string."
        });
        return;
    }

    if (!(latitude && longitude && crimeRate && averageAge && averagePrice)) {
        res.status(400).json({
            error: "Missing residential data."
        });
        return;
    }

    const residentialData = [latitude, longitude, crimeRate, averagePrice, averageAge];
    if (residentialData.some(data => Number.isNaN(Number(data)))) {
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

    const residentialData = [crimeRate, averagePrice, averageAge];
    if (residentialData.some(data => Number.isNaN(Number(data)))) {
        res.status(400).json({
            error: "Residential data given are not numbers."
        });
        return;
    }

    next();
};

const isNeighborhoodExistsById= async (req: Request, res: Response, next: NextFunction) => {
    const neighborhoodId = req.body.neighborhoodId;
    
    const neighborhood = await NeighborhoodCollection.findOneById(neighborhoodId);
    if (!neighborhood) {
        res.status(404).json({
            error: `Neighborhood with neighborhood ID ${neighborhoodId} does not exist.`
        });
        return;
    }
    next();
}

export {
    isCreateInfoValid,
    isNeighborhoodAlreadyExists,
    isNeighborhoodExists,
    isUpdatedInfoValid,
    isNeighborhoodExistsById
};
