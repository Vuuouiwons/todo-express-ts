import { Request, Response } from 'express';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')

import { v1Router } from './v1/v1.route'

const parserMiddleware = [cors(), bodyParser.json(), morgan('dev')]
const router = express.Router();
router.use(parserMiddleware);

router.get('/health', (req: Request, res: Response) => res.status(200).json({ 'status': 'OK' }));
router.use('/v1', v1Router);

export { router };