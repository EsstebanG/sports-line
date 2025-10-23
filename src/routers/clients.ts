//
import { Router } from 'express'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

//
import { getClientsController, getClientByIdController, createNewClientController, updateClientController, deleteClientController } from "../controllers/client.controller.ts";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

//
const router: Router = Router();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// CRUD de clientes. / Clients CRUD.
router.get("/", getClientsController);          // Función final para obtener todos los clientes. / Final function to obtain all clients.
router.get("/:id", getClientByIdController);    // Función final para obtener cliente por ID. / Final function to obtain client by ID.
router.post("/", createNewClientController);    // Función final para crear nuevo cliente. / Final function to create new client.
router.put("/:id", updateClientController);     // Función final para actualizar cliente por ID. / Final function to update client by ID.
router.delete("/:id", deleteClientController);  // Función final para eliminar cliente por ID. / Final function to delete client by ID.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

//
export { router };
