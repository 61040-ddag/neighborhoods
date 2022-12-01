import type { HydratedDocument, Types } from 'mongoose';
import type { Stroll } from './model';
import StrollModel from './model';

class StrollCollection {
    /**
     * Add a new stroll
     *
     * @param {string} userId - The id of the user that posts
     * @param {string} neighborhoodId - The the id of the neighborhood
     * @param {string} title - The title of the stroll video
     * @param {string} strollVideo - The location in firebase of the stroll video
     * @return {Promise<HydratedDocument<Stroll>>} - The newly created Stroll
     */
    static async addOne(userId: Types.ObjectId | string, neighborhoodId: Types.ObjectId | string, title: string, strollVideo: string): Promise<HydratedDocument<Stroll>> {
      const dateUploaded = new Date();
      
      const stroll = new StrollModel({ userId, neighborhoodId, title, strollVideo, dateUploaded});
      await stroll.save(); // Saves stroll to MongoDB
      return stroll;
    }
    
    /**
     * Find a stroll by strollId
     * 
     * @param {string} strollId - The id of the stroll to find
     * @return {Promise<HydratedDocument<Stroll>>} - The stroll with the given strollId, if any
     */
    static async findOneById(strollId: Types.ObjectId | string): Promise<HydratedDocument<Stroll>> {
      return StrollModel.findOne({ _id: strollId });
    }

    /**
     * Delete a stroll by id
     * 
     * @param strollId - the id of the stroll to be deleted
     */
    static async deleteOneById(strollId: Types.ObjectId | string) : Promise<boolean> {
      const stroll = await StrollModel.deleteOne({_id: strollId});
      return stroll !== null;
    }
  
    /**
     * Get all strolls by user with user Id
     *
     * @param {string} userId - the id of the user whose strolls we are looking for
     * @return {Promise<HydratedDocument<Stroll>[]>} - An array of all of the strolls
     */
      static async findAllByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Stroll>>> {
      return StrollModel.find({userId: userId}).populate('userId').populate('neighborhoodId');
    }
    
    /**
     * Get all strolls of neighborhood with neighborhoodId that were not posted by the user
     *
     * @param {string} neighborhoodId - the id of the neighborhood whose strolls we are looking for
     * @param {string} userId - the id of the user making the request
     * @return {Promise<HydratedDocument<Stroll>[]>} - An array of all of the strolls
     */
     static async findAllByNeighborhoodId(neighborhoodId: Types.ObjectId | string, userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Stroll>>> {
      const strolls = await StrollModel.find({neighborhoodId}).populate('userId').populate('neighborhoodId');
      return strolls.filter(stroll => stroll.userId._id != userId);
    }
    
  }
  
  export default StrollCollection;