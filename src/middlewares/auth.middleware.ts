//
import type { Request, Response, NextFunction } from "express";

//
import jwt from "jsonwebtoken";

// Importamos la librería para las variables de entorno. / We import the library for the environment variables.
import dotenv from 'dotenv';

// Cargamos las variables del archivo .env / We load the variables from the .env file.
dotenv.config();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

export interface AuthRequest extends Request {
    user?: { id: number; email: string; role: string };
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token not provided!" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: number;
            email: string;
            role: string;
            iat: number;
            exp: number;
        };
        
        req.user = { id: payload.id, email: payload.email, role: payload.role };

        next();
    } catch (err) {
        return res.status(403).json({ message: "Token invalid or expired!" });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  

/*
    -> AuthorizeRoles: este middleware verifica que el role del usuario esté en la lista. Uso: authorizeRoles(['admin', 'regular'])
    - - -
    -> authorizeRoles: this middleware verifies that the user's role is on the list. Usage: authorizeRoles([‘admin’, regular’])
 */
export const authorizeRoles = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) return res.status(401).json({ message: 'Not authenticated' });

        if (!roles.includes(user.role)) return res.status(403).json({ message: 'Insufficient role' });

        next();
    };
};
