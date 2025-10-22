// Importamos nuestro modelo para trabajar en el. / We import our model to work on it.
import { User } from '../models/user.model.ts'

// Importamos la librería para usar json web tokens. / We import the library to use JSON web tokens.
import jwt from "jsonwebtoken";

// Importamos la librería que encriptara las contraseñas. / We import the library that will encrypt the passwords.
import bcrypt from "bcrypt";

//
import { createUser, findUserByEmail, saveRefreshToken, findUserByRefreshToken } from '../dao/user.dao.ts';

//
import type { RegisterDTO } from '../dto/auth.dto.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const JWT_SECRET = process.env.JWT_SECRET || 'A_very_powerful_secret';

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'A_secret_to_refresh_even_stronger';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Servicio para iniciar sesión. / Login service.
export const loginUsersService = async (email: string, password: string) => {
    try {
        const user = await findUserByEmail(email);

        if (!user) throw new Error('Incorrect credentials: user not found');

        const match = await bcrypt.compare(password, (user as any).password);
        if (!match) throw new Error('Incorrect credentials: password does not match');

        const payload = { id: (user as any).id_user, email: (user as any).email, role: (user as any).role };

        const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });

        await saveRefreshToken((user as any).id_user, refreshToken);

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("loginUsersService error:", error);
        throw error;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//
export const registerUserService = async (payload: RegisterDTO) => {
    try {
        const existing = await findUserByEmail(payload.email);

        if (existing) throw new Error('User already exists');

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(payload.password, salt);

        const user = await createUser({
            full_name: payload.full_name,
            email: payload.email,
            password: hashed,
            role: payload.role || 'regular'
        });

        // opcional: no devolver password en la respuesta
        const safeUser = { id_user: (user as any).id_user, full_name: (user as any).full_name, email: (user as any).email, role: (user as any).role };
        
        return safeUser;
    } catch (error) {
        console.error("registerUserService error:", error);
        throw error;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//
export const refreshTokenService = async (token: string) => {
    try {
        const payload = jwt.verify(token, JWT_REFRESH_SECRET) as any;

        const stored = await findUserByRefreshToken(token);
        if (!stored) throw new Error('Refresh token not found or revoked');

        const newAccessToken = jwt.sign({ id: payload.id, email: payload.email, role: payload.role }, JWT_SECRET, { expiresIn: '15m' });

        const newRefreshToken = jwt.sign({ id: payload.id, email: payload.email, role: payload.role }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
        await saveRefreshToken(payload.id, newRefreshToken);

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
        console.error("refreshTokenService error:", err);
        throw err;
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//
export const logoutService = async (userId: number) => {
    try {
        await saveRefreshToken(userId, null);
        return true;
    } catch (err) {
        console.error("logoutService error:", err);
        throw err;
    }
};