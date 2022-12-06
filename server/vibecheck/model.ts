import type { StringExpressionOperatorReturningArray, Types } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { User } from '../user/model';
import type { Neighborhood } from '../neighborhood/model';

// Vibe AKA interview
export type Vibe = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  residentId: Types.ObjectId;
  availabilityId: Types.ObjectId;
};


export type PopulatedVibe = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: User;
  residentId: User;
  availabilityId: Availability;
};


const VibeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  residentId: {
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
  vibeLink: string;
  dateTime: Date;
};


export type PopulatedAvailability = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: User;
  neighborhoodId: Neighborhood;
  vibeLink: string;
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
  vibeLink: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true,
  }
});

const VibeModel = model<Vibe>('Vibe', VibeSchema);
const AvailabilityModel = model<Availability>('Availability', AvailabilitySchema);

export {
  VibeModel,
  AvailabilityModel
};