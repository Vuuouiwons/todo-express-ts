const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')

import { handleHealth } from './utils/health';
import { v1Router } from './v1/v1.route'

const parserMiddleware = [cors(), bodyParser.json(), morgan('dev')]
const router = express.Router();

router.get('/health', handleHealth);

router.use(parserMiddleware);
router.use('/v1', v1Router);

export { router };