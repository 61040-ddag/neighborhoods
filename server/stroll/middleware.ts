import type { Request, Response, NextFunction } from 'express';
import StrollCollection from './collection';

const areInfoValid = async (req: Request, res: Response, next: NextFunction) => {
    const strollVideo = req.body.strollVideo;
    const title = req.body.title;

    if (!title || !strollVideo){
        res.status(400).json({
            error: "title or strollVideo not given"
        });
        return;
    }

    // check if filename exists in firebase

    next();
}

const isStrollExists = async (req: Request, res: Response, next: NextFunction) => {
    const strollId = req.params.strollId;
    const stroll = StrollCollection.findOneById(strollId);
    if(stroll){
        res.status(404).json({
            error: "There does not exist a stroll with this id"
        });
        return;
    }
    next();
}

export {
  areInfoValid,
  isStrollExists
};
