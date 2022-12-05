import type { HydratedDocument, Types } from 'mongoose';
import type { CertifiedResidency } from './model';
import CertifiedResidencyModel from './model';

class CertifiedResidencyCollection {
  /**
   * Add a new certifiedResidency between a user and neighborhood
   * 
   * @param {string} userId - The id of the user to add
   * @param {string} neighborhoodId - The id of the neighborhood to add
   * @return {Promise<HydratedDocument<CertifiedResidency>>} - The newly created Certified Residency
   */
  static async addResident(userId: Types.ObjectId | string, neighborhoodId: Types.ObjectId | string): Promise<HydratedDocument<CertifiedResidency>> {
    const residency = new CertifiedResidencyModel({ userId, neighborhoodId });
    await residency.save(); // Saves user to MongoDB
    return (await residency.populate('userId')).populate('neighborhoodId');
  }

  /**
   * Find a certifiedResidency by certifiedResidencyId
   *
   * @param {string} certifiedResidencyId - The certifiedResidencyId of certifiedResidency to find
   * @return {Promise<HydratedDocument<CertifiedResidency>> | Promise<null> } - The certifiedResidency with the given certifiedResidencyId, if any
   */
  static async findOne(certifiedResidencyId: Types.ObjectId | string): Promise<HydratedDocument<CertifiedResidency>> {
    return CertifiedResidencyModel.findOne({ _id: certifiedResidencyId }).populate('userId').populate('neighborhoodId');
  }

  /**
   * Find a certifiedResidency by userId and neighborhoodId
   * @param {string} userId - The id of the user to search
   * @param {string} neighborhoodId - The id of the neighborhood to search
   * @return {Promise<HydratedDocument<CertifiedResidency>>}
   */
  static async findOneByUserandNeighborhood(userId: Types.ObjectId | string, neighborhoodId: Types.ObjectId | string): Promise<HydratedDocument<CertifiedResidency>> {
    return CertifiedResidencyModel.findOne({ userId: userId, neighborhoodId: neighborhoodId });
  }


  /**
   * Find all the neighborhoods an user is a resident in
   * @param {string} userId - The id of the user to search
   * @return {Promise<HydratedDocument<CertifiedResidency>[]>}
   */
  static async findAllByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<CertifiedResidency>>> {
    return CertifiedResidencyModel.find({ userId: userId }).populate('userId').populate('neighborhoodId');
  }

  /**
   * Find all the Certified Residents in a neighborhood
   * @param {string} neighborhoodId - The id of the neighborhood to search
   * @return {Promise<HydratedDocument<CertifiedResidency>[]>}
   */
  static async findAllByNeighborhoodId(neighborhoodId: Types.ObjectId | string): Promise<Array<HydratedDocument<CertifiedResidency>>> {
    return CertifiedResidencyModel.find({ neighborhoodId: neighborhoodId }).populate('userId').populate('neighborhoodId');
  }

  /**
   * Delete Certfied Residency with given certifiedResidencyId
   * 
   * @param {string} certifiedResidencyId - The certifiedResidencyId of certifiedResidency to delete
   * @returns {Promise<Boolean>} - true if the certified residency has been deleted, false otherwise
   */
  static async deleteOneById(certifiedResidencyId: Types.ObjectId | string): Promise<boolean> {
    const residency = await CertifiedResidencyModel.deleteOne({ _id: certifiedResidencyId });
    return residency !== null;
  }

  /**
   * Delete all the Certified Residency by the given user
   *
   * @param {string} userId - The id of user
   */
  static async deleteManyByUser(userId: Types.ObjectId | string): Promise<void> {
    await CertifiedResidencyModel.deleteMany({ userId: userId });
  }

  /**
   * Delete all the Certified Residency by the given neighborhood
   *
   * @param {string} neighborhoodId - The id of neighborhood
   */
  static async deleteManyByLocation(neighborhoodId: Types.ObjectId | string): Promise<void> {
    await CertifiedResidencyModel.deleteMany({ neighborhoodId });
  }
}

export default CertifiedResidencyCollection;