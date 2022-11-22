import type { Request, Response } from 'express';
import express from 'express';
import NeighborhoodCollection from './collection';
import * as neighborhoodValidator from './middleware';
import * as util from './util';

const router = express.Router();


export { router as neighborhoodRouter };