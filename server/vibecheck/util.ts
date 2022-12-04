import type { HydratedDocument } from 'mongoose';
import moment from 'moment';
import type { Vibe, PopulatedVibe, PopulatedAvailability, Availability } from './model';

type VibeResponse = {
    _id: string;
    user: string;
    resident: string;
    vibeLink: string;
    dateScheduled: string;
};

type AvailabilityResponse = {
    _id: string;
    userId: string;
    time: string;
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
 * @param {HydratedDocument<Vibe>} Vibe - A Vibe object
 * @returns {VibeResponse} - The Vibe object to the frontend
 */
 const constructVibeResponse = (Vibe: HydratedDocument<Vibe>): VibeResponse => {
    const VibeCopy: PopulatedVibe = {
      ...Vibe.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
      })
    };
    
    const {username} = VibeCopy.userId;
    delete VibeCopy.userId;
    return {
      ...VibeCopy,
      _id: VibeCopy._id.toString(),
      user: username,
      resident: Vibe.residentId.toString(),
      vibeLink: Vibe.vibeLink,
      dateScheduled: formatDate(Vibe.dateScheduled),
    };
  };


/**
 * Transform a raw Availability object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Vibe>} Vibe - A Vibe object
 * @returns {VibeResponse} - The Vibe object to the frontend
 */
 const constructAvailabilityResponse = (availability: HydratedDocument<Availability>): AvailabilityResponse => {
    const availabilityCopy: PopulatedAvailability = {
      ...availability.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
      })
    };
    
    delete availabilityCopy.userId;
    return {
      ...availabilityCopy,
      _id: availabilityCopy._id.toString(),
      userId: availabilityCopy.userId,
      time: formatDate(availabilityCopy.time),
    };
  };
  
  export {
    constructVibeResponse,
    constructAvailabilityResponse
  };
  