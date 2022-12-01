import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { User } from '../user/model'
import type { Neighborhood } from '../neighborhood/model';

export type Review = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    authorId: Types.ObjectId;
    dateCreated: Date;
    locationId: Types.ObjectId;
    content: string;
};

export type PopulatedReview = {
    _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
    authorId: User;
    dateCreated: Date;
    locationId: Neighborhood;
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
    locationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Neighborhood'
    },
    content: {
        type: String,
        required: true
    }
});

const ReviewModel = model<Review>('Review', ReviewSchema);
export default ReviewModel;