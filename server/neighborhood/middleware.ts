import type { Request, Response, NextFunction } from 'express';
import { nextTick } from 'vue/types/umd';
import NeighborhoodCollection from '../neighborhood/collection';
import UserCollection from '../user/collection';

const isNeighborhoodAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const neighborhood = await NeighborhoodCollection.findOneByName(req.query.name as string, req.query.city as string, req.query.state as string);
    if (neighborhood){
        res.status(409).json({
            error: 'Neighborhood already exists'
        });
        return;
    }
    next();
}

const isUserAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserCollection.findOneByUserId(req.session.userId);
    if (! user.isAdmin){
        res.status(401).json({
            error: 'Only admin can perform this action'
          });
        return;
    }
    next();
}

const isNeighborhoodExists = async (req: Request, res: Response, next: NextFunction) => {
    const neighborhood = await NeighborhoodCollection.findOneByName(req.query.name as string, req.query.city as string, req.query.state as string);
    if (!neighborhood) {
        res.status(404).json({
            error: 'This neighborhood does not exists'
        });
        return;
    }
    next();
}

const areCoordinatesValid = async (req: Request, res: Response, next: NextFunction) => {
    const lat1 = req.query.lat1;
    const long1 = req.query.long1;
    const lat2 = req.query.lat2;
    const long2 = req.query.long2;

    if (!lat1 || !lat2 || !long1 || !long2){
        res.status(406).json({
            error: "Invalid data where given"
        });
        return;
    }
    try{
        Number(lat1);
        Number(lat2);
        Number(long1);
        Number(long2);
    }catch{
        res.status(406).json({
            error: "coordinates given are not numbers"
        });
        return;
    }
    next();
}

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

    if(!stringRegex.test(name) || !stringRegex.test(city) || !stringRegex.test(state)){
        res.status(400).json({
            error: "string data need to be nonempty"
        });
        return;
    }
    if (!latitude || !longitude || !crimeRate || !averageAge || !averagePrice){
        res.status(400).json({
            error: "Data need to be nonempty"
        });
        return;
    }
    try{
        Number(latitude);
        Number(longitude);
        Number(crimeRate);
        Number(averageAge);
        Number(averagePrice);
    }catch{
        res.status(400).json({
            error: "data given are not numbers"
        });
        return;
    }
    next();
    
}

const isUpdatedInfoValid = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query.name as string;
    const city = req.query.city as string;
    const state = req.query.state as string;
    const crimeRate = req.body.crimeRate;
    const averagePrice = req.body.averagePrice;
    const averageAge = req.body.averageAge;
    const stringRegex = /^\S+$/;

    if(!name || !city || !state) {
        res.status(400).json({
            error: "no neighborhood specified"
        });
        return;
    }

    const neighborhood = await NeighborhoodCollection.findOneByName(name, city, state);
    if (!neighborhood){
        res.status(404).json({
            error: "Neighborhood doesn't exist"
        });
        return;
    }
    if (!crimeRate || !averageAge || !averagePrice){
        res.status(400).json({
            error: "Data need to be nonempty"
        });
        return;
    }
    try{
        Number(crimeRate);
        Number(averageAge);
        Number(averagePrice);
    }catch{
        res.status(400).json({
            error: "data given are not numbers"
        });
        return;
    }

    next();
}


export {
    isCreateInfoValid,
    isNeighborhoodAlreadyExists,
    isUserAdmin,
    isNeighborhoodExists,
    areCoordinatesValid,
    isUpdatedInfoValid,
};
