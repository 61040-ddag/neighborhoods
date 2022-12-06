import type { HydratedDocument, Types } from 'mongoose';
import type { Availability, Vibe } from './model';
import { VibeModel, AvailabilityModel } from './model';
import CertifiedResidencyCollection from '../certifiedResidency/collection';

class VibeCollection {
  /**
   * Add a new Vibe
   *
   * @param {string} userId - The id of the user that posts
   * @param {string} residentId - The the id of the resident
   * @param {string} availabilityId - The id of the availablility
   * @return {Promise<HydratedDocument<Vibe>>} - The newly created Vibe
   */
  static async addVibe(userId: Types.ObjectId | string, residentId: Types.ObjectId | string, availabilityId: Types.ObjectId | string): Promise<HydratedDocument<Vibe>> {
    const vibe = new VibeModel({ userId, residentId, availabilityId });
    await vibe.save(); // Saves Vibe to MongoDB
    // return (await (await Vibe.populate('userId')).populate('residentId')).populate('availabilityId');
    return vibe;
  }

  /**
   * Find a Vibe by VibeId
   * 
   * @param {string} VibeId - The id of the Vibe to find
   * @return {Promise<HydratedDocument<Vibe>>} - The Vibe with the given VibeId, if any
   */
  static async findOneById(VibeId: Types.ObjectId | string): Promise<HydratedDocument<Vibe>> {
    return VibeModel.findOne({ _id: VibeId });
  }

  /**
   * Delete a Vibe by id
   * 
   * @param VibeId - the id of the Vibe to be deleted
   */
  static async deleteOneById(VibeId: Types.ObjectId | string): Promise<boolean> {
    const Vibe = await VibeModel.deleteOne({ _id: VibeId });
    return Vibe !== null;
  }

  /**
   * Delete all the Vibes for a given user
   *
   * @param {string} userId - The id of user
   */
  static async deleteManyByAuthor(userId: Types.ObjectId | string): Promise<void> {
    await VibeModel.deleteMany({ userId: userId });
    await VibeModel.deleteMany({ residentId: userId });
  }
  
  /**
   * Find all vibes userId is part of
   * 
   * @param {string} userId - The id of the user whose vibes we are looking for
   */
  static async findAllByUserId(userId: Types.ObjectId | string):Promise<Array<HydratedDocument<Vibe>>> {
    const otherVibes = await VibeModel.find({userId : userId}).populate('userId').populate('residentId').populate('availabilityId');
    const myVibes = await VibeModel.find({residentId: userId});
    otherVibes.push(...myVibes);
    return otherVibes;
  }

  /**
   * Find a Vibe by VibeId and UserId
   * 
   * @param {string} VibeId - The id of the Vibe to find
   * @param {string} UserId - The id of the User to find
   * @return {Promise<HydratedDocument<Vibe>>} - The Vibe with the given VibeId, if any
   */
   static async findOneByIdAndUserId(VibeId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<HydratedDocument<Vibe>> {
    const user =  await VibeModel.findOne({ _id: VibeId, userId : userId});
    const resident =  await VibeModel.findOne({ _id: VibeId, residentId : userId});
    if (user){
      return user;
    }else if(resident){
      return resident;
    }else{
      return null;
    }
  }
}

class AvailabilityCollection {
  /**
   * Add a new Availability
   *
   * @param {string} userId - The id of the user
   * @param {string} neighborhoodId - The id of the neighborhood
   * @param {string} vibeLink - The video link of the vibe interview
   * @param {string} dateTime - the string representation of the date and time
   * @return {Promise<HydratedDocument<Availability>>} - The newly created Availability
   */
  static async addOne(userId: Types.ObjectId | string, neighborhoodId: Types.ObjectId | string, vibeLink: string, dateTime: Date): Promise<HydratedDocument<Availability>> {
    ;
    const Availability = new AvailabilityModel({ userId, neighborhoodId, vibeLink, dateTime });
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
   * Get all Availabilities by user with user Id
   *
   * @param {string} userId - the id of the user whose Vibes we are looking for
   * @return {Promise<HydratedDocument<Vibe>[]>} - An array of all of the availabilities
   */
  static async findAllByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Availability>>> {
    return AvailabilityModel.find({ userId: userId }).populate('userId').populate('neighborhoodId');
  }

  /**
   * Get all the availabilites by given neighborhood
   *availabilites
   * @param {string} neighborhoodId - The id of neighborhood of the availabilites
   * @return {Promise<HydratedDocument<Availability>[]>} - An array of all of the availabilites
   */
  static async findAllByNeighborhoodId(neighborhoodId: Types.ObjectId | string): Promise<Array<HydratedDocument<Availability>>> {
    return await AvailabilityModel.find({ neighborhoodId }).populate('userId').populate('neighborhoodId');
  }

  /**
   * Delete an Availability by id
   * 
   * @param availabilityId - the id of the Availability to be deleted
   */
   static async deleteOneById(availabilityId: Types.ObjectId | string): Promise<boolean> {
    const Availability = await AvailabilityModel.deleteOne({ _id: availabilityId });
    return Availability !== null;
  }

    /**
   * Delete all the availability by the given user
   *
   * @param {string} userId - The id of user
   */
     static async deleteManyByAuthor(userId: Types.ObjectId | string): Promise<void> {
      await AvailabilityModel.deleteMany({ userId: userId });
    }
  
    /**
     * Delete all the availability by the given neighborhood
     *
     * @param {string} neighborhoodId - The id of neighborhood
     */
    static async deleteManyByNeighborhood(neighborhoodId: Types.ObjectId | string): Promise<void> {
      await AvailabilityModel.deleteMany({ neighborhoodId });
    }
}

export {
  VibeCollection,
  AvailabilityCollection
};