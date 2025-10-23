//
import { Router } from 'express'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

//
import { loginUsersController, registerUsersController, refreshController, logoutController } from '../controllers/auth.controller.ts';

// Middlewares.
import { authenticateToken } from '../middlewares/auth.middleware.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

//
const router:Router = Router()

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

// 
router.post('/login', loginUsersController);
router.post('/register', registerUsersController);
router.post('/refresh', refreshController);
router.post('/logout', authenticateToken, logoutController);

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

//
export { router }