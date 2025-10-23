// Importamos los tipos TypeScript 'Request' y 'Response' desde Express. / We import the TypeScript types ‘Request’ and ‘Response’ from Express.
import type { Request, Response } from "express";

// Importamos los servicios que utilizaremos para los controladores. / We import the services we will use for the controllers.
import { getAllClientsService, getClientByIdService, createNewClientService, updateClientService, deleteClientService } from "../services/client.services.ts";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “GET” - Obtener todos los clientes. / Controller for “GET” method - Get all clients.
export const getClientsController = async (req: Request, res: Response) => {
    try {
        const clients = await getAllClientsService();
        return res.status(200).json(clients);
    } catch (error) {
        console.error("❌ Error in 'getClientsController':", error);
        return res.status(500).json({ message: "Error fetching clients.", error: (error as Error).message });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “GET” por ID - Obtener cliente por ID. / Controller for “GET” method by ID - Get client by ID. 
export const getClientByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "Invalid client ID format." });

        const client = await getClientByIdService(id);
        if (!client) return res.status(404).json({ message: "Client not found." });

        return res.status(200).json(client);
    } catch (error) {
        console.error("❌ Error in 'getClientByIdController':", error);
        return res.status(500).json({ message: "Error fetching client.", error: (error as Error).message });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “POST” - Crear un nuevo cliente. / Controller for “POST” method - Create a new client.
export const createNewClientController = async (req: Request, res: Response) => {
    try {
        const { full_name, document, email } = req.body;
        if (!full_name || !document || !email) {
            return res.status(400).json({ message: "Missing required fields." });
        };

        const client = await createNewClientService(full_name, document, email);
        return res.status(201).json({ message: "Client created successfully! ✔️", client });
    } catch (error) {
        console.error("❌ Error in 'createNewClientController':", error);
        return res.status(500).json({ message: "Error creating client.", error: (error as Error).message });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método “PUT” o “PATCH” - Actualizar un cliente. / Controller for “PUT” or “PATCH” method - Update a client.
export const updateClientController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;

        if (isNaN(id)) return res.status(400).json({ message: "Invalid client ID format." });

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No data provided to update." });
        };

        const updated = await updateClientService(id, data);
        if (!updated) return res.status(404).json({ message: "Client not found for update." });

        return res.status(200).json({ message: "Client successfully updated! ✔️", client: updated });
    } catch (error) {
        console.error("❌ Error in 'updateClientController':", error);
        return res.status(500).json({ message: "Error updating client.", error: (error as Error).message });
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para el método "DELETE" - Eliminar un cliente. / Controller for “DELETE” method - Delete a client.
export const deleteClientController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "Invalid client ID format." });

        const deleted = await deleteClientService(id);
        if (!deleted) return res.status(404).json({ message: "Client not found to delete." });

        return res.status(200).json({ message: "Client deleted successfully! ✔️", deletedId: id });
    } catch (error) {
        console.error("❌ Error in 'deleteClientController':", error);
        return res.status(500).json({ message: "Error deleting client.", error: (error as Error).message });
    };
};
