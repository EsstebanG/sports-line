//
import type { Request, Response } from "express"

//
import { loginUsersService } from '../services/auth.services.ts'

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para iniciar sesión. / Login controller.
export const loginUsersController = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const token = await loginUsersService(email, password);
        return res.json({ message: "Login successful", token });
    } catch (error: any) {
        if (error.message.includes("Incorrect")) {
            return res.status(401).json({ message: error.message });
        }

        console.error("Login controller error:", error);
        return res.status(500).json({ message: "Internal server error ❌" });
    }
};
