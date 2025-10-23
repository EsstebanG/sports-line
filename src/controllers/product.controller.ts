// Importamos los tipos TypeScript 'Request' y 'Response' desde Express. / We import the TypeScript types ‘Request’ and ‘Response’ from Express.
import type { Request, Response } from "express";

// Importamos los servicios que utilizaremos para los controladores. / We import the services we will use for the controllers.
import { getAllProductsService, getProductByIdService, createNewProductService, updateProductService, deleteProductService } from "../services/product.services.ts";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “GET” - Obtener todos los productos. / Controller for “GET” method - Get all products.
export const getProductsController = async (req: Request, res: Response) => {
    try {
        const products = await getAllProductsService();
        return res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error in 'getProductsController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while getting products.",
            error: (error as Error).message
        });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “GET” por ID - Obtener producto por ID. / Controller for “GET” method by ID - Get product by ID. 
export const getProductByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "Invalid product ID format." });

        const product = await getProductByIdService(id);
        if (!product) return res.status(404).json({ message: "Product not found." });

        return res.status(200).json(product);
    } catch (error) {
        console.error("❌ Error in 'getProductByIdController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while fetching product by ID.",
            error: (error as Error).message
        });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “POST” - Crear un nuevo producto. / Controller for “POST” method - Create a new product.
export const createNewProductController = async (req: Request, res: Response) => {
    try {
        const { name, description, value, stock } = req.body;

        if (!name || value === undefined) {
            return res.status(400).json({
                message: "Missing required fields: name or value."
            });
        }

        const product = await createNewProductService(name, description, Number(value), Number(stock) || 0);

        return res.status(201).json({
            message: "Product created successfully! ✔️",
            product
        });
    } catch (error) {
        console.error("❌ Error in 'createNewProductController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while creating the product.",
            error: (error as Error).message
        });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “PUT” o “PATCH” - Actualizar un producto. / Controller for “PUT” or “PATCH” method - Update a product.
export const updateProductController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;

        if (isNaN(id)) return res.status(400).json({ message: "Invalid product ID format." });
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No data provided to update." });
        };

        const updatedProduct = await updateProductService(id, data);

        if (!updatedProduct) return res.status(404).json({ message: "Product not found for update." });

        return res.status(200).json({
            message: "Product successfully updated! ✔️",
            product: updatedProduct
        });
    } catch (error) {
        console.error("❌ Error in 'updateProductController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while updating the product.",
            error: (error as Error).message
        });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método "DELETE" - Eliminar un producto. / Controller for “DELETE” method - Delete a product.
export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "Invalid product ID format." });

        const deleted = await deleteProductService(id);
        if (!deleted) return res.status(404).json({ message: "Product not found to delete." });

        return res.status(200).json({
            success: true,
            message: "Product successfully deleted! ✔️",
            deletedId: id
        });
    } catch (error) {
        console.error("❌ Error in 'deleteProductController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while deleting the product.",
            error: (error as Error).message
        });
    };
};