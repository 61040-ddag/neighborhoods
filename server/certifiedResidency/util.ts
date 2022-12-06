import type { HydratedDocument } from 'mongoose';
import type { CertifiedResidency, PopulatedCertifiedResidency } from './model';

type neighborhood = {
  _id: string,
  name: string;
  city: string;
  state: string;
}

type CertifiedResidencyResponse = {
  _id: string;
  user: string;
  neighborhood: neighborhood;
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
 * Transform a raw CertifiedResidency object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<CertifiedResidency>} certifiedResidency - A certified residency object
 * @returns {CertifiedResidencyResponse} - The certified residency object created
 */
const constructCertifiedResidencyResponse = (certifiedResidency: HydratedDocument<CertifiedResidency>): CertifiedResidencyResponse => {
  const certifiedResidencyCopy: PopulatedCertifiedResidency = {
    ...certifiedResidency.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const { username } = certifiedResidencyCopy.userId;
  delete certifiedResidencyCopy.userId;
  const { _id, name, city, state } = certifiedResidencyCopy.neighborhoodId;
  delete certifiedResidencyCopy.neighborhoodId;
  return {
    ...certifiedResidencyCopy,
    _id: certifiedResidencyCopy._id.toString(),
    user: username,
    neighborhood: { _id: _id.toString(), name: formatWord(name), city: formatWord(city), state: state.toUpperCase() }
  };
};

export {
  constructCertifiedResidencyResponse
};