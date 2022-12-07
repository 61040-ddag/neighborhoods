import type { HydratedDocument, Types } from 'mongoose';
import type { Availability, VibeCheck } from './model';
import { VibeCheckModel, AvailabilityModel } from './model';

class VibeCheckCollection {
  /**
   * Add a new vibe check
   *
   * @param {string} userId - The id of the user that posts
   * @param {string} availabilityId - The id of the availablility
   * @return {Promise<HydratedDocument<VibeCheck>>} - The newly created vibe check
   */
  static async addOne(userId: Types.ObjectId | string, availabilityId: Types.ObjectId | string): Promise<HydratedDocument<VibeCheck>> {
    const vibeCheck = new VibeCheckModel({ userId, availabilityId });
    await vibeCheck.save(); // Saves Vibe to MongoDB
    return (await vibeCheck.populate('userId')).populate({ path: 'availabilityId', populate: [{ path: 'userId' }, { path: 'neighborhoodId' }] });
  }

  /**
   * Find a vibe check by vibeCheckId
   * 
   * @param {string} vibeCheckId - The id of the vibe check to find
   * @return {Promise<HydratedDocument<VibeCheck>>} - The vibe check with the given vibeCheckId, if any
   */
  static async findOneById(vibeCheckId: Types.ObjectId | string): Promise<HydratedDocument<VibeCheck>> {
    return VibeCheckModel.findOne({ _id: vibeCheckId });
  }

  /**
   * Find a vibe check by VibeId and UserId
   * 
   * @param {string} vibeCheckId - The id of the vibe check to find
   * @param {string} UserId - The id of the User to find
   * @return {Promise<HydratedDocument<VibeCheck>>} - The vibe check with the given VibeId, if any
   */
  static async findOneByIdAndUserId(vibeCheckId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<HydratedDocument<VibeCheck>> {
    const user = await (await VibeCheckModel.findOne({ _id: vibeCheckId, userId: userId }))
    const resident = await VibeCheckModel.findOne({ _id: vibeCheckId, residentId: userId })
    if (user) {
      return user;
    } else if (resident) {
      return resident;
    } else {
      return null;
    }
  }

  /**
   * Find all vibe checks userId is part of
   * 
   * @param {string} userId - The id of the user whose vibe checks we are looking for
   */
  static async findAllByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<VibeCheck>>> {
    const otherVibeChecks = await VibeCheckModel.find({ userId: userId }).populate('userId').populate({ path: 'availabilityId', populate: [{ path: 'userId' }, { path: 'neighborhoodId' }] });
    const myVibeChecks = await VibeCheckModel.find({ "availabilityId.userId._id": userId }).populate('userId').populate({ path: 'availabilityId', populate: [{ path: 'userId' }, { path: 'neighborhoodId' }] });
    otherVibeChecks.push(...myVibeChecks);
    return otherVibeChecks;
  }

  /**
   * Delete a vibe check by id
   * 
   * @param vibeCheckId - the id of the Vibe to be deleted
   */
  static async deleteOneById(vibeCheckId: Types.ObjectId | string): Promise<boolean> {
    const vibeCheck = await VibeCheckModel.deleteOne({ _id: vibeCheckId });
    return vibeCheck !== null;
  }

  /**
   * Delete all the vibe check for a given resident of availability
   *
   * @param {string} availabilityId - The id of availability
   */
  static async deleteOneByAvailabilityId(availabilityId: Types.ObjectId | string): Promise<boolean> {
    const vibeCheck = await VibeCheckModel.deleteMany({ availabilityId: availabilityId });
    return vibeCheck !== null;
  }

  /**
  * Delete all the vibe check for a given user
  *
  * @param {string} userId - The id of user
  */
  static async deleteManyByUser(userId: Types.ObjectId | string): Promise<void> {
    await VibeCheckModel.deleteMany({ userId: userId });
  }
}

class AvailabilityCollection {
  /**
   * Add a new Availability
   *
   * @param {string} userId - The id of the user
   * @param {string} neighborhoodId - The id of the neighborhood
   * @param {string} videoLink - The video link of the vibe interview
   * @param {string} dateTime - the string representation of the date and time
   * @return {Promise<HydratedDocument<Availability>>} - The newly created Availability
   */
  static async addOne(userId: Types.ObjectId | string, neighborhoodId: Types.ObjectId | string, videoLink: string, dateTime: Date): Promise<HydratedDocument<Availability>> {
    ;
    const Availability = new AvailabilityModel({ userId, neighborhoodId, videoLink, dateTime });
    await Availability.save(); // Saves Vibe to MongoDB
    return (await Availability.populate('userId')).populate('neighborhoodId');
  }

  /**
   * Find a availability by availabilityId
   *
   * @param {string} availabilityId - The availabilityId of availability to find
   * @return {Promise<HydratedDocument<Availability>> | Promise<null> } - The availability with the given availabilityId, if any
   */
  static async findOne(availabilityId: Types.ObjectId | string): Promise<HydratedDocument<Availability>> {
    return AvailabilityModel.findOne({ _id: availabilityId }).populate('userId').populate('neighborhoodId');
  }

  /**
   * Get all availabilities by user with user Id
   *
   * @param {string} userId - the id of the user whose Vibes we are looking for
   * @return {Promise<HydratedDocument<VibeCheck>[]>} - An array of all of the availabilities
   */
  static async findAllByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Availability>>> {
    return AvailabilityModel.find({ userId: userId }).populate('userId').populate('neighborhoodId');
  }

  /**
   * Get all the availabilites by given neighborhood
   * 
   * @param {string} neighborhoodId - The id of neighborhood of the availabilites
   * @return {Promise<HydratedDocument<Availability>[]>} - An array of all of the availabilites
   */
  static async findAllByNeighborhoodId(neighborhoodId: Types.ObjectId | string): Promise<Array<HydratedDocument<Availability>>> {
    return await AvailabilityModel.find({ neighborhoodId: neighborhoodId }).populate('userId').populate('neighborhoodId');
  }

  /**
   * Delete an availability by id
   * 
   * @param availabilityId - the id of the Availability to be deleted
   */
  static async deleteOneById(availabilityId: Types.ObjectId | string): Promise<boolean> {
    const Availability = await AvailabilityModel.deleteOne({ _id: availabilityId });
    return Availability !== null;
  }

  /**
 * Delete all the availabilities by the given user
 *
 * @param {string} userId - The id of user
 */
  static async deleteManyByUser(userId: Types.ObjectId | string): Promise<void> {
    await AvailabilityModel.deleteMany({ userId: userId });
  }

  /**
   * Delete all the availabilities by the given neighborhood
   *
   * @param {string} neighborhoodId - The id of neighborhood
   */
  static async deleteManyByNeighborhood(neighborhoodId: Types.ObjectId | string): Promise<void> {
    await AvailabilityModel.deleteMany({ neighborhoodId });
  }
}

export {
  VibeCheckCollection,
  AvailabilityCollection
};