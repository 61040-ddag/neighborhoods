import type { HydratedDocument, Types } from 'mongoose';
import type { Review } from './model';
import ReviewModel from './model';
import UserCollection from '../user/collection';

class ReviewCollection {
    /**
     * Add a review to the collection
     *
     * @param {string} authorId - The id of the author of the review
     * @param {string} neighborhoodId - The id of neighborhood of the review
     * @param {number} rating - The rating of the review
     * @param {string} content - The content of the review
     * @return {Promise<HydratedDocument<Review>>} - The newly created review
     */
    static async addOne(authorId: Types.ObjectId | string, neighborhoodId: Types.ObjectId | string, rating: number, content: string): Promise<HydratedDocument<Review>> {
        const date = new Date();
        const review = new ReviewModel({
            authorId,
            dateCreated: date,
            neighborhoodId,
            rating,
            content
        });
        await review.save();
        return (await review.populate('authorId')).populate('neighborhoodId');
    }

    /**
     * Find a review by reviewId
     *
     * @param {string} reviewId - The id of the review to find
     * @return {Promise<HydratedDocument<Review>> | Promise<null> } - The review with the given reviewId, if any
     */
    static async findOne(reviewId: Types.ObjectId | string): Promise<HydratedDocument<Review>> {
        return ReviewModel.findOne({ _id: reviewId }).populate('authorId').populate('neighborhoodId');
    }

    /**
     * Get all the reviews by given location
     *
     * @param {string} neighborhoodId - The id of neighborhood of the reviews
     * @return {Promise<HydratedDocument<Review>[]>} - An array of all of the reviews
     */
    static async findAllByLocation(neighborhoodId: Types.ObjectId | string): Promise<Array<HydratedDocument<Review>>> {
        return ReviewModel.find({ neighborhoodId: neighborhoodId }).sort({ dateCreated: -1 }).populate('authorId').populate('neighborhoodId');
    }

    /**
     * Get all the reviews by given author
     *
     * @param {string} username - The username of author of the reviews
     * @return {Promise<HydratedDocument<Review>[]>} - An array of all of the reviews
     */
    static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Review>>> {
        const author = await UserCollection.findOneByUsername(username);
        return ReviewModel.find({ authorId: author._id }).sort({ dateCreated: -1 }).populate('authorId').populate('neighborhoodId');
    }

    /**
     * Delete a review with given reviewId.
     *
     * @param {string} reviewId - The reviewId of review to delete
     * @return {Promise<Boolean>} - true if the review has been deleted, false otherwise
     */
    static async deleteOne(reviewId: Types.ObjectId | string): Promise<boolean> {
        const review = await ReviewModel.deleteOne({ _id: reviewId });
        return review !== null;
    }

    /**
     * Delete all the reviews by the given author
     *
     * @param {string} authorId - The id of author of reviews
     */
    static async deleteManyByAuthor(authorId: Types.ObjectId | string): Promise<void> {
        await ReviewModel.deleteMany({ authorId });
    }

    /**
     * Delete all the reviews by the given author
     *
     * @param {string} neighborhoodId - The id of neighborhood of reviews
     */
     static async deleteManyByLocation(neighborhoodId: Types.ObjectId | string): Promise<void> {
        await ReviewModel.deleteMany({ neighborhoodId });
    }
}

export default ReviewCollection;