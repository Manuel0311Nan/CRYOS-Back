import express from "express";
import { writeConsult, getAllConsult } from '../controllers/consultController.js'

const consultRoutes = express.Router();

consultRoutes.post('/', writeConsult);
consultRoutes.get('/', getAllConsult);

export { consultRoutes };
