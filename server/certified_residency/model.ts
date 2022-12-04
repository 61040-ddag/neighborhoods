import type { Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export type CertifiedResidency = {
    _id: Types.ObjectId;
    userId: string;
    neighborhoodId: string;
};

const CertifiedResidencySchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    neighborhoodId: {
        type: String,
        required: true
    }
})

const CertifiedResidencyModel = model<CertifiedResidency>('CertifiedResidency', CertifiedResidencySchema);
export default CertifiedResidencyModel;