import type { NextFunction, Request, Response } from 'express';
import express from 'express';
import ReviewCollection from './collection';
import NeighborhoodCollection from '../neighborhood/collection';
import * as userValidator from '../user/middleware';
import * as neighborhoodValidator from '../neighborhood/middleware';
import * as reviewValidator from '../review/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get reviews by location.
 *
 * @name GET /api/reviews/neighborhoods?name=name&city=city&state=state
 *
 * @return {ReviewResponse[]} - An array of reviews of a neighborhood with name, city, state
 * @throws {400} - If name, city or state is not given
 * @throws {400} - If the user is not logged in
 * @throws {404} - If name, city, state of a neighborhood is not a recognized neighborhood
 *
 */
router.get(
    '/neighborhoods',
    [
        userValidator.isUserLoggedIn,
        neighborhoodValidator.isNeighborhoodExists
    ],
    async (req: Request, res: Response) => {
        const name = req.query.name as string;
        const city = req.query.city as string;
        const state = req.query.state as string;

        const neighborhood = await NeighborhoodCollection.findOneByInfo(name, city, state);

        const neighborhoodReviews = await ReviewCollection.findAllByLocation(neighborhood._id);
        const response = neighborhoodReviews.map(util.constructReviewResponse);
        res.status(200).json(response);
    }
);

/**
 * Get reviews by author.
 *
 * @name GET /api/reviews/authors?author=username
 *
 * @return {ReviewResponse[]} - An array of reviews created by user with username author
 * @throws {400} - If author is not given
 * @throws {400} - If the user is not logged in
 * @throws {404} - If no user has given author
 *
 */
router.get(
    '/authors',
    [
        userValidator.isUserLoggedIn,
        userValidator.isAuthorExists
    ],
    async (req: Request, res: Response) => {
        const authorReviews = await ReviewCollection.findAllByUsername(req.query.author as string);
        const response = authorReviews.map(util.constructReviewResponse);
        res.status(200).json(response);
    }
);

/**
 * Create a new review.
 *
 * @name POST /api/reviews
 *
 * @param {string} locationId - The id of the location of the review
 * @param {string} content - The content of the review
 * @return {ReviewResponse} - The created review
 * @throws {400} - If the review content is empty or a stream of empty spaces
 * @throws {403} - If the user is not logged in
 * @throws {413} - If the review content is more than 4096 characters long
 */
router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
        reviewValidator.isValidReviewContent
    ],
    async (req: Request, res: Response) => {
        const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
        const review = await ReviewCollection.addOne(userId, req.body.locationId, req.body.content);

        res.status(201).json({
            message: 'Your review was created successfully.',
            review: util.constructReviewResponse(review)
        });
    }
);

/**
 * Delete a review
 *
 * @name DELETE /api/reviews/:reviewId
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the review
 * @throws {404} - If the reviewId is not valid
 */
router.delete(
    '/:reviewId?',
    [
        userValidator.isUserLoggedIn,
        reviewValidator.isReviewExists,
        reviewValidator.isValidReviewModifier
    ],
    async (req: Request, res: Response) => {
        await ReviewCollection.deleteOne(req.params.reviewId);
        res.status(200).json({
            message: 'Your review was deleted successfully.'
        });
    }
);

export { router as reviewRouter };