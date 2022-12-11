import type { StringExpressionOperatorReturningArray, Types } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { User } from '../user/model';
import type { Neighborhood } from '../neighborhood/model';

// Vibe Check AKA interview
export type VibeCheck = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  availabilityId: Types.ObjectId;
};


export type PopulatedVibeCheck = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: User;
  availabilityId: PopulatedAvailability;
};


const VibeCheckSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  availabilityId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Availability'
  },
});

// Availability
export type Availability = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  neighborhoodId: Types.ObjectId;
  videoLink: string;
  dateTime: Date;
};


export type PopulatedAvailability = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: User;
  neighborhoodId: Neighborhood;
  videoLink: string;
  dateTime: Date;
};


const AvailabilitySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  neighborhoodId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Neighborhood'
  },
  videoLink: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true,
  }
});

const VibeCheckModel = model<VibeCheck>('VibeCheck', VibeCheckSchema);
const AvailabilityModel = model<Availability>('Availability', AvailabilitySchema);

export {
  VibeCheckModel,
  AvailabilityModel
};