import { Router } from 'express';
import SurveysController from '../controllers/SurveysController';

const router = Router();
const surveysController = new SurveysController();

router.post('/', surveysController.create);

export default router;
