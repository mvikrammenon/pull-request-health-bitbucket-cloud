import express from 'express';
import { getPullRequests } from '../controllers/pr.controller.js';

const router = express.Router();

router.get('/pull-requests', getPullRequests);

export default router;