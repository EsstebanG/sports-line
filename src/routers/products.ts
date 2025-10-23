//
import { Router } from 'express'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//
import { getProductsController, getProductByIdController, createNewProductController, updateProductController, deleteProductController } from "../controllers/product.controller.ts";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//
const router: Router = Router();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

// CRUD de productos. / Products CRUD.
router.get("/", getProductsController);          // Función final para obtener todos los productos. / Final function to obtain all products.
router.get("/:id", getProductByIdController);    // Función final para obtener producto por ID. / Final function to obtain product by ID.
router.post("/", createNewProductController);    // Función final para crear nuevo producto. / Final function to create new product.
router.put("/:id", updateProductController);     // Función final para actualizar producto por ID. / Final function to update product by ID.
router.delete("/:id", deleteProductController);  // Función final para eliminar producto por ID. / Final function to delete product by ID.

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

//
export { router };
