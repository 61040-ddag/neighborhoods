import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export type Neighborhood = {
    _id: Types.ObjectId;
    name: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    crimeRate: number;
    averagePrice: number;
    averageAge: number;
};

const NeighborhoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    crimeRate: {
        type: Number,
        required: true
    },
    averagePrice: {
        type: Number,
        required: true
    },  
    averageAge: {
        type: Number,
        required: true
    }
});

const NeighborhoodModel = model<Neighborhood>('Neighborhood', NeighborhoodSchema);
export default NeighborhoodModel;
