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
     * Find a Vibe by VibeId
     * 
     * @param {string} VibeId - The id of the Vibe to find
     * @return {Promise<HydratedDocument<Vibe>>} - The Vibe with the given VibeId, if any
     */
    static async findOneById(VibeId: Types.ObjectId | string): Promise<HydratedDocument<Vibe>> {
      return VibeModel.findOne({ _id: VibeId });
    }

    /**
     * Find a Vibe by username and time
     * 
     * @param {userId} userId - The id of the user in the vibe interview
     * @param {time} time: the time of the interview
     * @return {Promise<HydratedDocument<Vibe>>} - The Vibe with the given VibeId, if any
     */
    static async findOneByUserAndTime(userId: string, time: string): Promise<HydratedDocument<Vibe>> {
        let time_ = time.replace("th", "");
        time_ = time_.replace("nd", "");
        time_ = time_.replace("rd", "");
        time_ = time_.replace("st", "");
        console.log('line 41');
        console.log(time_);
        const timeDate = new Date(time_);
        return VibeModel.findOne({userId: userId, dateScheduled: timeDate})
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
  }



class AvailabilityCollection {
    /**
     * Add a new Availability
     *
     * @param {string} userId - The id of the user that posts
     * @param {string} dateString - the string representation of the date
     * @return {Promise<HydratedDocument<Vibe>>} - The newly created Vibe
     */
     static async addAvailability(username: string | string, date: string): Promise<HydratedDocument<Availability>> {   
        const time = new Date(date);
        const Availability = new AvailabilityModel({ username, time });
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
     * Get all Availabilities by user with user Id
     *
     * @param {string} userId - the id of the user whose Vibes we are looking for
     * @return {Promise<HydratedDocument<Vibe>[]>} - An array of all of the availabilities
     */
     static async findAllByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Availability>>> {
        console.log(`Find all by userid: ${userId}`);
        return AvailabilityModel.find({userId: userId});
    }

    /**
     * Get all Availabilities by user with username
     *
     * @param {string} username - the name of the user whose availabilities we are looking for
     * @return {Promise<HydratedDocument<Availability>[]>} - An array of all of the availabilities
     */
     static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Availability>>> {
        console.log(`Find all by username: ${username}`);
        return AvailabilityModel.find();
    }
}
  
  export {
    VibeCollection,
    AvailabilityCollection
  }