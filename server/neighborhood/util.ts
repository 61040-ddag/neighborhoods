import type { HydratedDocument } from 'mongoose';
import moment from 'moment';
import type { Neighborhood } from './model';

type NeighborhoodResponse = {
    _id: string;
    name: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    crimeRate: number;
    averagePrice: number;
    averageAge: number;
};

/**
 * Encode a readable word
 * 
 * @param {string} word - The database version of the word
 * @returns {string} - Readable version of the word
 */
const formatWord = (word: string): string => {
  return word.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

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
      _id: neighborhoodCopy._id.toString(),
      name: formatWord(neighborhoodCopy.name),
      city: formatWord(neighborhoodCopy.city),
      state: formatWord(neighborhoodCopy.state)
    };
  };
  
  export {
    constructNeighborhoodResponse,
    formatWord
  };
  