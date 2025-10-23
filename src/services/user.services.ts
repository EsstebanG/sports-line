// Importamos nuestro modelo para trabajar en el. / We import our model to work on it.
import { User } from '../models/user.model.ts'

// Importamos la librería que encriptara las contraseñas. / We import the library that will encrypt the passwords.
import bcrypt from "bcrypt";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para usuarios - GET. / User service - GET.
export const getAllUsersService = async () => {
    try {
        const users = await User.findAll();

        if (users.length === 0) {
            console.warn("❓ There are no registered users yet.");
            return [];
        };

        // Retornar usuarios sin contraseñas. / Return users without passwords.
        return users.map(user => {
            const data = user.toJSON();
            delete data.password;
            return data;
        });
    } catch (error) {
        console.error("❌ An error occurred in 'getAllUsersService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para usuarios - GET por ID. / User service - GET by ID.
export const getUserByIdService = async (id: number) => {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            console.warn("❓ User not found or does not exist...");
            return null;
        };

        // Retornar usuarios sin contraseñas. / Return users without passwords.
        const data = user.toJSON();
        delete data.password;
        return data;
    } catch (error) {
        console.error("❌ An error occurred in 'getUserByIdService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para usuarios - POST. / User service - POST.
export const createNewUserService = async (full_name: string, email: string, password: string) => {
    if (!password || typeof password !== "string") {
        throw new Error("Password is required and must be a string. ❗");
    };

    if (!full_name || !email) {
        throw new Error("❓ Missing required fields...");
    };

    try {
        // Normalizamos los valores. / Normalize input values.
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedName = full_name.trim();

        // Verificamos si el email ya existe. / Check if email already exists.
        const existingUser = await User.findOne({ where: { email: normalizedEmail } });
        if (existingUser) {
            throw new Error("❗ A user with this email already exists.");
        }

        // Encriptamos la contraseña. / Hash the password.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos el nuevo usuario. / Create new user.
        const user = await User.create({
            full_name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword,
        });

        // Retornamos el usuario sin contraseña. / Return user without password.
        const data = user.toJSON();
        delete data.password;
        return data;
    } catch (error) {
        console.error("❌ An error occurred in 'createNewUserService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para usuarios - PUT o PATCH. / Users service - PUT or PATCH.

// Definimos un tipo específico para actualizar usuarios. / Define a specific type for updating users.
type UserUpdateData = {
    full_name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'regular';
    deleted_at?: Date | null;
    refresh_token?: string | null;
};

export const updateUserService = async (id: number, data: UserUpdateData) => {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            console.warn("❓ User not found...");
            return null;
        };

        // Validamos que haya datos para actualizar. / Ensure there’s data to update.
        if (Object.keys(data).length === 0) {
            throw new Error("❗ No data provided to update.");
        }

        // Encriptamos la contraseña si se envía una nueva. / Hash new password if provided.
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        };

        // Evitamos modificar el ID. / Prevent ID modification.
        delete (data as any).id_user;

        // Actualizamos los datos del usuario. / Update user data.
        await user.update(data);

        // Retornamos el usuario actualizado sin la contraseña. / Return updated user without password.
        const result = user.toJSON();
        delete result.password;

        console.log(`✔️ User with ID ${id} successfully updated!`);
        return result;
    } catch (error) {
        console.error("❌ An error occurred in 'updateUserService'.", error);
        throw error;
    };
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para usuarios - DELETE. / Users service - DELETE.
export const deleteUserService = async (id: number) => {
    try {
        const user = await User.findByPk(id);

        if (!user) {
            console.warn("❓ User not found...");
            return null;
        };

        await user.destroy();

        console.log(`✔️ User with ID ${id} successfully deleted!`);
        return { message: "User deleted successfully", id: user.id_user };
    } catch (error) {
        console.error("❌ An error occurred in 'deleteUserService'.", error);
        throw error;
    };
};