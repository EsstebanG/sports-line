// Importamos nuestro modelo para trabajar en el. / We import our model to work on it.
import { Client } from '../models/client.model.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para clientes - GET. / Clients service - GET.
export const getAllClientsService = async () => {
    try {
        const clients = await Client.findAll();

        if (clients.length === 0) {
            console.warn("❓ There are no registered clients yet.");
            return [];
        };

        return clients;
    } catch (error) {
        console.error("❌ An error occurred in 'getAllClientsService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para clientes - GET por ID. / Clients service - GET by ID.
export const getClientByIdService = async (id: number) => {
    try {
        const client = await Client.findByPk(id);

        if (!client) {
            console.warn("❓ Client not found...");
            return null;
        };

        return client;
    } catch (error) {
        console.error("❌ An error occurred in 'getClientByIdService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para clientes - POST. / Clients service - POST.
export const createNewClientService = async (full_name: string, document: string, email: string) => {
    try {
        if (!full_name || !document || !email) {
            throw new Error("❗ Missing required fields: full_name, document or email.");
        };

        const existing = await Client.findOne({ where: { document } });
        if (existing) throw new Error("❗ A client with this document already exists.");

        const existingEmail = await Client.findOne({ where: { email } });
        if (existingEmail) throw new Error("❗ A client with this email already exists.");

        const client = await Client.create({
            full_name: full_name.trim(),
            document: document.trim(),
            email: email.trim().toLowerCase(),
            created_at: new Date()
        });

        return client;
    } catch (error) {
        console.error("❌ An error occurred in 'createNewClientService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para clientes - PUT o PATCH. / Clients service - PUT or PATCH.

// Definimos un tipo específico para actualizar clientes. / Define a specific type for updating clients.
type ClientUpdateData = {
    full_name?: string;
    document?: string;
    email?: string;
    deleted_at?: Date | null;
};

export const updateClientService = async (id: number, data: ClientUpdateData) => {
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            console.warn("❓ Client not found...");
            return null;
        }

        if (Object.keys(data).length === 0) {
            throw new Error("❗ No data provided to update.");
        }

        delete (data as any).id_client;

        await client.update(data);

        console.log(`✔️ Client with ID ${id} successfully updated!`);
        return client;
    } catch (error) {
        console.error("❌ An error occurred in 'updateClientService'.", error);
        throw error;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para clientes - DELETE. / Clients service - DELETE.
export const deleteClientService = async (id: number) => {
    try {
        const client = await Client.findByPk(id);

        if (!client) {
            console.warn("❓ Client not found...");
            return null;
        };

        await client.destroy();
        console.log(`✔️ Client with ID ${id} successfully deleted!`);
        return { message: "Client deleted successfully", id: client.id_client };
    } catch (error) {
        console.error("❌ An error occurred in 'deleteClientService'.", error);
        throw error;
    };
};
