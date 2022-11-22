import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export type Neighborhood = {
    _id: Types.ObjectId;
    
};

const NeighborhoodSchema = new Schema({

});

const NeighborhoodModel = model<Neighborhood>('Neighborhood', NeighborhoodSchema);
export default NeighborhoodModel;
