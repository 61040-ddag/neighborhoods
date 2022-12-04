import type { StringExpressionOperatorReturningArray, Types } from 'mongoose';
import { Schema, model } from 'mongoose';
import type {User} from '../user/model';
import type {Neighborhood} from '../neighborhood/model';

// Vibe AKA interview
export type Vibe = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  residentId: Types.ObjectId;
  vibeLink: string;
  dateScheduled: Date;
};


export type PopulatedVibe = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  userId: User;
  residentId: Neighborhood;
  vibeLink: string;
  dateScheduled: Date; 
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
  vibeLink: {
    type: String,
    required: true
  },
  dateScheduled: {
    type: Date,
    required: true
  },
});

// Availability
export type Availability = {
  _id: Types.ObjectId;
  username: string;
  time: Date;
};


export type PopulatedAvailability = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  username: string;
  time: Date;
};


const AvailabilitySchema = new Schema({
  username: {
    type: String,
    required: true,
    ref: 'User'
  },
  time: {
    type: Date,
    required: true,
  }
});

const  AvailabilityModel = model<Availability>('Availability', AvailabilitySchema);
const VibeModel = model<Vibe>('Vibe', VibeSchema);

export { 
  VibeModel,
  AvailabilityModel
}