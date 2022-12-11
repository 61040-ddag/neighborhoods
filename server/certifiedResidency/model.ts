import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';
import type { User } from '../user/model'
import type { Neighborhood } from '../neighborhood/model';

export type CertifiedResidency = {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    neighborhoodId: Types.ObjectId;
};

export type PopulatedCertifiedResidency = {
    _id: Types.ObjectId;
    userId: User;
    neighborhoodId: Neighborhood;
};

const CertifiedResidencySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    neighborhoodId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Neighborhood'
    }
});

const CertifiedResidencyModel = model<CertifiedResidency>('CertifiedResidency', CertifiedResidencySchema);
export default CertifiedResidencyModel;