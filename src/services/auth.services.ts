// Importamos nuestro modelo para trabajar en el. / We import our model to work on it.
import { User } from '../models/user.model.ts'

// Importamos la librería para usar json web tokens. / We import the library to use JSON web tokens.
import jwt from "jsonwebtoken";

// Importamos la librería que encriptara las contraseñas. / We import the library that will encrypt the passwords.
import bcrypt from "bcrypt";

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para iniciar sesión. / Login service.
export const loginUsersService = async (email: string, password: string): Promise<string> => {
    try {
        const user = await User.findOne({ where: { email } }); // <- Buscamos el usuario por el email. / We search for the user by email.

        if (!user) {
            throw new Error("Incorrect email or email not found. ❌");
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Incorrect password. ❌");
        };

        const token = jwt.sign(
            { id: user.id_user, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return token;

    } catch (error) {
        console.error("An error has occurred in the user service 'loginUsersService'. ❗", error);
        throw error;
    };
};