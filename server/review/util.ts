import type { HydratedDocument } from 'mongoose';
import moment from 'moment';
import type { Review, PopulatedReview } from '../review/model';

type location = {
    name: string;
    city: string;
    state: string;
}

type ReviewResponse = {
    _id: string;
    author: string;
    dateCreated: string;
    location: location;
    content: string;
}

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Review object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Review>} review - A review
 * @returns {ReviewResponse} - The review object formatted for the frontend
 */
const constructReviewResponse = (review: HydratedDocument<Review>): ReviewResponse => {
    const reviewCopy: PopulatedReview = {
        ...review.toObject({
            versionKey: false // Cosmetics; prevents returning of __v property
        })
    };
    const { username } = reviewCopy.authorId;
    delete reviewCopy.authorId;
    const { name, city, state } = reviewCopy.locationId;
    delete reviewCopy.locationId;
    return {
        ...reviewCopy,
        _id: reviewCopy._id.toString(),
        author: username,
        dateCreated: formatDate(review.dateCreated),
        location: { name: name, city: city, state: state }
    };
};

export {
    constructReviewResponse
};