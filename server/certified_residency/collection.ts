import type { HydratedDocument, Types } from 'mongoose';
import type { CertifiedResidency } from './model';
import CertifiedResidencyModel from './model';

class CertifiedResidencyCollection {
    /**
     * Add a new Certified User for a Neighborhood
     * 
     * @param {string} userId - The id of the user to add
     * @param {string} neighborhoodId - The id of the neighborhood to add
     * @return {Promise<HydratedDocument<CertifiedResidency>>} - The newly created Certified User
     */
    static async addResident(userId: Types.ObjectId | string, neighborhoodId: Types.ObjectId | string): Promise<HydratedDocument<CertifiedResidency>> {
        const residency = new CertifiedResidencyModel({userId, neighborhoodId});
        await residency.save(); // Saves user to MongoDB
        return residency
    }

    /**
     * Find all the neighborhoods a User is certified for
     * @param {string} userId - The id of the user to search
     * @return {Promise<HydratedDocument<CertifiedResidency>[]>}
     */
    static async findAllByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<CertifiedResidency>>> {
        return CertifiedResidencyModel.find({ userId: userId });
    }

    /**
     * Delete Certfied User with given UserId and neighborhoodId
     * 
     * @param {string} userId - The id of the user to delete
     * @param {string} neighborhoodId - The id of the neighborhood to delete
     * @returns {Promise<Boolean>} - true if the certified residency has been deleted, false otherwise
     */
  static async deleteOneById(userId: Types.ObjectId | string, neighborhoodId: Types.ObjectId | string): Promise<boolean> {
    const residency = await CertifiedResidencyModel.deleteOne({ userId: userId, neighborhoodId: neighborhoodId});
    return residency !== null;
  }
}

export default CertifiedResidencyCollection;