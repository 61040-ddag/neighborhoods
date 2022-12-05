import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { User } from '../user/model'
import type { Neighborhood } from '../neighborhood/model';

export type Review = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    authorId: Types.ObjectId;
    dateCreated: Date;
    neighborhoodId: Types.ObjectId;
    rating: number;
    content: string;
};

export type PopulatedReview = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    authorId: User;
    dateCreated: Date;
    neighborhoodId: Neighborhood;
    rating: number;
    content: string;
};

const ReviewSchema = new Schema<Review>({
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dateCreated: {
        type: Date,
        required: true
    },
    neighborhoodId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Neighborhood'
    },
    rating: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const ReviewModel = model<Review>('Review', ReviewSchema);
export default ReviewModel;