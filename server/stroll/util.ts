import type { HydratedDocument } from 'mongoose';
import moment from 'moment';
import type { Stroll, PopulatedStroll } from './model';

type StrollResponse = {
    _id: string;
    author: string;
    name: string;
    city: string;
    state: string;
    title: string;
    strollVideo: string;
    dateUploaded: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
 const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');


/**
 * Transform a raw Neighborhood object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Stroll>} Stroll - A Stroll object
 * @returns {StrollResponse} - The Stroll object to the frontend
 */
 const constructStrollResponse = (stroll: HydratedDocument<Stroll>): StrollResponse => {
    const strollCopy: PopulatedStroll = {
      ...stroll.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
      })
    };
    
    const {username} = strollCopy.userId;
    const {name, city, state} = strollCopy.neighborhoodId;
    delete strollCopy.userId;
    delete strollCopy.neighborhoodId;
    return {
      ...strollCopy,
      _id: strollCopy._id.toString(),
      dateUploaded: formatDate(stroll.dateUploaded),
      author: username,
      name: name,
      city: city,
      state: state,
    };
  };
  
  export {
    constructStrollResponse,
  };
  