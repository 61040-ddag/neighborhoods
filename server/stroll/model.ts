import type { StringExpressionOperatorReturningArray, Types } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { User } from '../user/model';
import type { Neighborhood } from '../neighborhood/model';

export type Stroll = {
  _id: Types.ObjectId;
  authorId: Types.ObjectId;
  neighborhoodId: Types.ObjectId;
  title: string;
  strollVideo: string;
  dateUploaded: Date;
};

export type PopulatedStroll = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  authorId: User;
  neighborhoodId: Neighborhood;
  title: string;
  strollVideo: string;
  dateUploaded: Date;
};

const StrollSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  neighborhoodId: {
    type: String,
    required: true,
    ref: 'Neighborhood'
  },
  title: {
    type: String,
    required: true
  },
  strollVideo: {
    type: String,
    required: true
  },
  dateUploaded: {
    type: Date,
    required: true
  },
});

const StrollModel = model<Stroll>('Stroll', StrollSchema);
export default StrollModel;
