import type { HydratedDocument, Types } from 'mongoose';
import type { Stroll } from './model';
import StrollModel from './model';
import UserCollection from '../user/collection';

class StrollCollection {
  /**
   * Add a new stroll
   *
   * @param {string} authorId - The id of the author of the stroll
   * @param {string} neighborhoodId - The the id of the neighborhood
   * @param {string} title - The title of the stroll video
   * @param {string} strollVideo - The stroll video
   * @return {Promise<HydratedDocument<Stroll>>} - The newly created Stroll
   */
  static async addOne(authorId: Types.ObjectId | string, neighborhoodId: Types.ObjectId | string, title: string, strollVideo: string): Promise<HydratedDocument<Stroll>> {
    const dateUploaded = new Date();

    const stroll = new StrollModel({ authorId, neighborhoodId, title, strollVideo, dateUploaded });
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
   * Get all strolls by user with username
   *
   * @param {string} username - the username of the user whose strolls we are looking for
   * @return {Promise<HydratedDocument<Stroll>[]>} - An array of all of the strolls
   */
  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Stroll>>> {
    const user = await UserCollection.findOneByUsername(username);
    return StrollModel.find({ authorId: user._id }).populate('authorId').populate('neighborhoodId');
  }

  /**
   * Get all strolls of neighborhood with neighborhoodId that were not posted by the user
   *
   * @param {string} neighborhoodId - the id of the neighborhood whose strolls we are looking for
   * @param {string} authorId - the id of the user making the request
   * @return {Promise<HydratedDocument<Stroll>[]>} - An array of all of the strolls
   */
  static async findAllBylocation(neighborhoodId: Types.ObjectId | string, authorId: Types.ObjectId | string): Promise<Array<HydratedDocument<Stroll>>> {
    const strolls = await StrollModel.find({ neighborhoodId }).populate('authorId').populate('neighborhoodId');
    // return strolls.filter(stroll => stroll.authorId._id != authorId);
    return strolls;
  }

  /**
   * Delete a stroll by id
   * 
   * @param strollId - the id of the stroll to be deleted
   */
  static async deleteOneById(strollId: Types.ObjectId | string): Promise<boolean> {
    const stroll = await StrollModel.deleteOne({ _id: strollId });
    return stroll !== null;
  }

  /**
   * Delete all the strolls by the given user
   *
   * @param {string} userId - The id of user
   */
   static async deleteManyByAuthor(userId: Types.ObjectId | string): Promise<void> {
    await StrollModel.deleteMany({ userId: userId });
  }

  /**
   * Delete all the strolls by the given neighborhood
   *
   * @param {string} neighborhoodId - The id of neighborhood
   */
  static async deleteManyByLocation(neighborhoodId: Types.ObjectId | string): Promise<void> {
    await StrollModel.deleteMany({ neighborhoodId });
  }
}

export default StrollCollection;