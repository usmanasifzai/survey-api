import { Router } from 'express';
import QuestionsController from '../controllers/QuestionsController';

const router = Router();
const questionsController = new QuestionsController();

router.get('/', questionsController.index);

export default router;
