import type { HydratedDocument } from 'mongoose';
import moment from 'moment';
import type { Review, PopulatedReview } from '../review/model';

type neighborhood = {
    _id: string;
    name: string;
    city: string;
    state: string;
}

type ReviewResponse = {
    _id: string;
    author: string;
    dateCreated: string;
    neighborhood: neighborhood;
    rating: number;
    content: string;
}

/**
 * Encode a readable word
 * 
 * @param {string} word - The database version of the word
 * @returns {string} - Readable version of the word
 */
const formatWord = (word: string): string => {
    return word.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
    const { _id, name, city, state } = reviewCopy.neighborhoodId;
    delete reviewCopy.neighborhoodId;
    return {
        ...reviewCopy,
        _id: reviewCopy._id.toString(),
        author: username,
        dateCreated: formatDate(review.dateCreated),
        neighborhood: { _id: _id.toString(), name: formatWord(name), city: formatWord(city), state: state.toUpperCase() }
    };
};

export {
    constructReviewResponse
};