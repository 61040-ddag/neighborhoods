import type { HydratedDocument } from 'mongoose';
import moment from 'moment';
import type { Vibe, PopulatedVibe, PopulatedAvailability, Availability } from './model';

type VibeResponse = {
    _id: string;
    username: string;
    residentname: string;
    dateTime: string;
    vibeLink: string;
};

type neighborhood = {
    _id: string;
    name: string;
    city: string;
    state: string;
};

type AvailabilityResponse = {
    _id: string;
    username: string;
    neighborhood: neighborhood 
    vibeLink: string;
    dateTime: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
 const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');


/**
 * Transform a raw Vibe object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Vibe>} Vibe - A Vibe object
 * @returns {VibeResponse} - The Vibe object to the frontend
 */
 const constructVibeResponse = (vibe: HydratedDocument<Vibe>): VibeResponse => {
  const vibeCopy: PopulatedVibe = {
    ...vibe.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const username  = vibeCopy.userId.username;
  const residentname  = vibeCopy.residentId.username;
  const dateTime = vibeCopy.availabilityId.dateTime;
  const vibeLink = vibeCopy.availabilityId.vibeLink;
  delete vibeCopy.userId;
  delete vibeCopy.residentId;
  delete vibeCopy.availabilityId;
  return {
    ...vibeCopy,
    _id: vibeCopy._id.toString(),
    username: username,
    residentname: residentname,
    dateTime: formatDate(dateTime),
    vibeLink: vibeLink,
  };
};

/**
 * Transform a raw Availability object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Availability>} availability - A availability object
 * @returns {VibeResponse} - The Vibe object to the frontend
 */
 const constructAvailabilityResponse = (availability: HydratedDocument<Availability>): AvailabilityResponse => {
    const availabilityCopy: PopulatedAvailability = {
      ...availability.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
      })
    };
    const { username } = availabilityCopy.userId;
    const { _id, name, city, state } = availabilityCopy.neighborhoodId;
    delete availabilityCopy.userId;
    delete availabilityCopy.neighborhoodId;
    return {
      ...availabilityCopy,
      _id: availabilityCopy._id.toString(),
      username: username,
      neighborhood: {
        _id: _id.toString(),
        name: name,
        city: city,
        state: state
      },
      dateTime: formatDate(availabilityCopy.dateTime),
    };
  };
  
  export {
    constructVibeResponse,
    constructAvailabilityResponse
  };
  