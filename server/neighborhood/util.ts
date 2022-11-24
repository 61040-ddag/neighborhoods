import type { HydratedDocument } from 'mongoose';
import moment from 'moment';
import type { Neighborhood } from './model';

type NeighborhoodResponse = {
    _id: string;
    name: string;
    state: string;
    latitude: number;
    longitude: number;
    crimeRate: number;
    averagePrice: number;
    averageAge: number;
};

/**
 * Transform a raw Neighborhood object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Neighborhood>} neighborhood - A neighborhood object
 * @returns {NeighborhoodResponse} - The neighborhood object to the frontend
 */
 const constructNeighborhoodResponse = (neighborhood: HydratedDocument<Neighborhood>): NeighborhoodResponse => {
    const neighborhoodCopy: Neighborhood = {
      ...neighborhood.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
      })
    };
    
    return {
      ...neighborhoodCopy,
      _id: neighborhoodCopy._id.toString()
    };
  };
  
  export {
    constructNeighborhoodResponse
  };
  