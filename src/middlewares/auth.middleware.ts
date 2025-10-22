//
import type { Request, Response, NextFunction } from "express";

//
import jwt from "jsonwebtoken";

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
}
