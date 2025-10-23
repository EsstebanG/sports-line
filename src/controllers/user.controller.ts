// Importamos los tipos TypeScript 'Request' y 'Response' desde Express. / We import the TypeScript types ‘Request’ and ‘Response’ from Express.
import type { Request, Response } from "express";

// Importamos los servicios que utilizaremos para los controladores. / We import the services we will use for the controllers.
import { getAllUsersService, getUserByIdService, createNewUserService, updateUserService, deleteUserService } from "../services/user.services.ts";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “GET” - Obtener todos los usuarios. / Controller for “GET” method - Get all users.
export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsersService();
        return res.status(200).json(users);
    } catch (error) {
        console.error("❌ Error in 'getUsersController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while getting users.",
            error: (error as Error).message
        });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “GET” por ID - Obtener usuario por ID. / Controller for “GET” method by ID - Get user by ID. 
export const getUserByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid user ID format." });
        };

        const user = await getUserByIdService(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        };

        return res.status(200).json(user);
    } catch (error) {
        console.error("❌ Error in 'getUserByIdController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while fetching user by ID.",
            error: (error as Error).message
        });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “POST” - Crear un nuevo usuario. / Controller for “POST” method - Create a new user.
export const createNewUserController = async (req: Request, res: Response) => {
    try {
        const { full_name, email, password } = req.body;

        // Validación básica. / Basic validation.
        if (!full_name || !email || !password) {
            return res.status(400).json({
                message: "Missing required fields: full_name, email, or password."
            });
        };

        const user = await createNewUserService(full_name, email, password);

        return res.status(201).json({
            message: "User created successfully! ✔️",
            user
        });
    } catch (error) {
        console.error("❌ Error in 'createNewUserController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while creating the user.",
            error: (error as Error).message
        });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “PUT” o “PATCH” - Actualizar un usuario. / Controller for “PUT” or “PATCH” method - Update a user.
export const updateUserController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid user ID format." });
        };

        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No data provided to update." });
        };

        const updatedUser = await updateUserService(id, data);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found for update." });
        };

        return res.status(200).json({
            message: "User successfully updated! ✔️",
            user: updatedUser
        });
    } catch (error) {
        console.error("❌ Error in 'updateUserController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while updating the user.",
            error: (error as Error).message
        });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método "DELETE" - Eliminar un usuario. / Controller for “DELETE” method - Delete a user.
export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid user ID format." });
        };

        const deleted = await deleteUserService(id);

        if (!deleted) {
            return res.status(404).json({ message: "User not found to delete." });
        };

        return res.status(200).json({
            success: true,
            message: "User successfully deleted! ✔️",
            deletedId: id
        });
    } catch (error) {
        console.error("❌ Error in 'deleteUserController':", error);

        return res.status(500).json({
            message: "An unexpected error occurred while deleting the user.",
            error: (error as Error).message
        });
    };
};