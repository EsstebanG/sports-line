//
import { Router } from 'express'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

//
import { getUsersController, getUserByIdController, createNewUserController, updateUserController, deleteUserController } from '../controllers/user.controller.ts'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

// Middlewares.
import { authenticateToken } from '../middlewares/auth.middleware.ts'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

//
const router:Router = Router()

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

// CRUD de usuarios. / Users CRUD.
router.get('/', getUsersController);         // Función final para obtener todos los usuarios. / Final function to obtain all users.
router.get('/:id', getUserByIdController)    // Función final para obtener usuario por ID. / Final function to obtain user by ID.
router.post('/', createNewUserController)    // Función final para crear nuevo usuario. / Final function to create new user.
router.put('/:id', updateUserController)     // Función final para actualizar usuario por ID. / Final function to update user by ID.
router.delete('/:id', deleteUserController)  // Función final para eliminar usuario por ID. / Final function to delete user by ID.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

//
export { router }