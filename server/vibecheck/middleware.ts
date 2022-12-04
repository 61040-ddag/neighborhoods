import type { Request, Response, NextFunction } from 'express';
import VibeCollection from './collection';

const areInfoValid = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const resident = req.body.resident;
    const dateScheduled = req.body.dateScheduled;


    if (!username || !resident || !dateScheduled){
        res.status(400).json({
            error: "username, resident, or scheduled date missing"
        });
        return;
    }
    next();
}

const isAvailabilityInfoValid = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const date = req.body.date;

    if (!username || !date) {
        res.status(400).json({
            error: "username or date missing"
        });
        return;
    }
    return;
}

const isVibeExists = async (req: Request, res: Response, next: NextFunction) => {
    const VibeId = req.params.VibeId;
    const Vibe = VibeCollection.findOneById(VibeId);
    if(Vibe){
        res.status(404).json({
            error: "There does not exist a Vibe with this id"
        });
        return;
    }
    next();
}

export {
  areInfoValid,
  isVibeExists,
  isAvailabilityInfoValid
};