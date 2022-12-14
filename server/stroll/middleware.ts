import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import StrollCollection from './collection';

const areInfoValid = async (req: Request, res: Response, next: NextFunction) => {
    const strollVideo = req.body.strollVideo;
    const title = req.body.title;

    if (!title || !strollVideo) {
        res.status(400).json({
            error: "Missing title or stroll video."
        });
        return;
    }

    next();
}

const isStrollExists = async (req: Request, res: Response, next: NextFunction) => {
    const strollId = req.params.strollId;
    const stroll = StrollCollection.findOneById(strollId);
    if (!stroll) {
        res.status(404).json({
            error: `Stroll with stroll ID ${req.params.strollId} does not exist.`
        });
        return;
    }
    next();
}

export {
    areInfoValid,
    isStrollExists
};
