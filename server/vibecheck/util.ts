import type { HydratedDocument } from 'mongoose';
import moment from 'moment';
import type { VibeCheck, PopulatedVibeCheck, PopulatedAvailability, Availability } from './model';

type VibeCheckResponse = {
  _id: string;
  username: string;
  availability: availability;
};

type availability = {
  _id: string;
  residentname: string;
  neighborhood: neighborhood;
  videoLink: string;
  dateTime: Date;
}

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
  videoLink: string;
  dateTime: Date;
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
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');


/**
 * Transform a raw Vibe Check object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<VibeCheck>} vibeCheck - A vibe check object
 * @returns {VibeCheckResponse} - The vibe check object to the frontend
 */
const constructVibeCheckResponse = (vibeCheck: HydratedDocument<VibeCheck>): VibeCheckResponse => {
  const vibeCheckCopy: PopulatedVibeCheck = {
    ...vibeCheck.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const username = vibeCheckCopy.userId.username;
  const { _id: availability_id, userId: residentId, neighborhoodId, videoLink, dateTime } = vibeCheckCopy.availabilityId;
  const { username: residentname } = residentId;
  const { _id: neighborhood_id, name, city, state } = neighborhoodId;
  delete vibeCheckCopy.userId;
  delete vibeCheckCopy.availabilityId;
  return {
    ...vibeCheckCopy,
    _id: vibeCheckCopy._id.toString(),
    username: username,
    availability: {
      _id: availability_id.toString(),
      residentname: residentname,
      neighborhood: {
        _id: neighborhood_id.toString(),
        name: formatWord(name),
        city: formatWord(city),
        state: state.toUpperCase()
      },
      videoLink: videoLink,
      dateTime: dateTime
    }
  };
};

/**
 * Transform a raw Availability object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Availability>} availability - A availability object
 * @returns {VibeCheckResponse} - The Vibe object to the frontend
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
      name: formatWord(name),
      city: formatWord(city),
      state: state.toUpperCase()
    },
    dateTime: availabilityCopy.dateTime,
  };
};

export {
  constructVibeCheckResponse,
  constructAvailabilityResponse,
  formatDate
};
