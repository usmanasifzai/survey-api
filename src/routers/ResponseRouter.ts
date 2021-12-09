import { Router } from 'express';
import ResponsesController from '../controllers/ResponsesController';

const router = Router();
const responseController = new ResponsesController();

router.get('/', responseController.userResponse);

export default router;
