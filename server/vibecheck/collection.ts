import type { HydratedDocument, Types } from 'mongoose';
import { isUserLoggedIn } from 'server/user/middleware';
import type { Availability, Vibe } from './model';
import { VibeModel, AvailabilityModel } from './model';

class VibeCollection {
    /**
     * Add a new Vibe
     *
     * @param {string} userId - The id of the user that posts
     * @param {string} residentId - The the id of the resident
     * @param {string} vibeLink - The video link of the vibe interview
     * @param {string} dateScheduledString - The scheduled time as a string
     * @return {Promise<HydratedDocument<Vibe>>} - The newly created Vibe
     */
    static async addVibe(userId: Types.ObjectId | string, residentId: Types.ObjectId | string, vibeLink: string, dateScheduled: Date): Promise<HydratedDocument<Vibe>> {
      const Vibe = new VibeModel({ userId, residentId, vibeLink, dateScheduled });
      await Vibe.save(); // Saves Vibe to MongoDB
      return Vibe;
    }

    /**
     * Add a new Availability
     *
     * @param {string} userId - The id of the user that posts
     * @param {string} dateString - the string representation of the date
     * @return {Promise<HydratedDocument<Vibe>>} - The newly created Vibe
     */
     static async addAvailability(userId: Types.ObjectId | string, date: Date): Promise<HydratedDocument<Availability>> {   
        const Availability = new AvailabilityModel({ userId, date });
        await Availability.save(); // Saves Vibe to MongoDB
        return Availability;
    }

    /**
     * Delete an Availability by id
     * 
     * @param AvailabilityId - the id of the Availability to be deleted
     */
     static async deleteAvailabilty(userId_: Types.ObjectId | string, date_: Date) : Promise<boolean> {
        const Availability = await AvailabilityModel.deleteOne({ userId: userId_, dateScheduled: date_ });
        return Availability !== null;
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
    static async deleteOneById(VibeId: Types.ObjectId | string) : Promise<boolean> {
      const Vibe = await VibeModel.deleteOne({_id: VibeId});
      return Vibe !== null;
    }
  
    /**
     * Get all Availabilities by user with user Id
     *
     * @param {string} userId - the id of the user whose Vibes we are looking for
     * @return {Promise<HydratedDocument<Vibe>[]>} - An array of all of the availabilities
     */
      static async findAllByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Vibe>>> {
        console.log(`Find all by userid: ${userId}`);
        return VibeModel.find({userId: userId});
    }
    
    // /**
    //  * Get all Vibes of resident with residentId
    //  *
    //  * @param {string} residentId - the id of the neighborhood whose Vibes we are looking for
    //  * @param {string} userId - the id of the user making the request
    //  * @return {Promise<HydratedDocument<Vibe>[]>} - An array of all of the Vibes
    //  */
    //  static async findAllByResidentId(residentId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Vibe>>> {
    //   const Vibes = await VibeModel.find({residentId}).populate('userId').populate('residentId');
    //   return Vibes.filter(Vibe => Vibe.userId._id != userId);
    // }
    
  }
  
  export default VibeCollection;