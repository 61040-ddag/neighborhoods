import type { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import ReviewCollection from '../review/collection';

/**
 * Checks if a review with reviewId is req.params exists
 */
const isReviewExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.reviewId);
    const review = validFormat ? await ReviewCollection.findOne(req.params.reviewId) : '';
    if (!review) {
        res.status(404).json({
            error: `Review with review ID ${req.params.reviewId} does not exist.`
        });
        return;
    }

    next();
};

/**
 * Checks if the content of the review in req.body is valid, i.e not a stream of empty
 * spaces and not more than 4096 characters
 */
const isValidReviewContent = (req: Request, res: Response, next: NextFunction) => {
    const { content } = req.body as { content: string };
    const rating = req.body.rating;

    if (!content.trim()) {
        res.status(400).json({
            error: 'Review content must be at least one character long.'
        });
        return;
    }

    if (content.length > 4096) {
        res.status(413).json({
            error: 'Review content must be no more than 4096 characters.'
        });
        return;
    }

    if (Number.isNaN(Number(rating))) {
        res.status(400).json({
            error: "Review rating is not a number."
        });
        return;
    }

    if (rating < 1 || rating > 5) {
        res.status(400).json({
            error: "Review rating must be between 1 and 5."
        });
        return;
    }

    next();
};

/**
 * Checks if the current user is the author of the review whose reviewId is in req.params
 */
const isValidReviewModifier = async (req: Request, res: Response, next: NextFunction) => {
    const review = await ReviewCollection.findOne(req.params.reviewId);
    const userId = review.authorId._id;
    if (req.session.userId !== userId.toString()) {
        res.status(403).json({
            error: 'Cannot modify other users\' reviews.'
        });
        return;
    }

    next();
};

export {
    isReviewExists,
    isValidReviewContent,
    isValidReviewModifier
};