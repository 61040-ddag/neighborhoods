import type { HydratedDocument } from 'mongoose';
import type {CertifiedResidency} from './model';

type CertifiedResidencyResponse = {
    _id: string;
    userId: string;
    neighborhoodId: string;
};

/**
 * Transform a raw CertifiedResidency object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<CertifiedResidency>} certified_residency - A certified residency object
 * @returns {CertifiedResidencyResponse} - The certified residency object created
 */
 const constructCertifiedResidencyResponse = (certified_residency: HydratedDocument<CertifiedResidency>): CertifiedResidencyResponse => {
    const CertifiedResidencyCopy: CertifiedResidency = {
      ...certified_residency.toObject({
        versionKey: false // Cosmetics; prevents returning of __v property
      })
    };
    return {
      ...CertifiedResidencyCopy,
      _id: CertifiedResidencyCopy._id.toString()
    };
  };
  
  export {
    constructCertifiedResidencyResponse
  };