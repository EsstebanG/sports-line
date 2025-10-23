//
import type { Request, Response } from "express"

//
import { loginUsersService, registerUserService, refreshTokenService, logoutService } from '../services/auth.services.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Controlador para iniciar sesión. / Login controller.
export const loginUsersController = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    try {
        const tokens = await loginUsersService(email, password);
        return res.json({ message: 'Login successful', ...tokens });
    } catch (error: any) {
        if (error.message && error.message.toLowerCase().includes('incorrect')) {
            return res.status(401).json({ message: error.message });
        }
        console.error('Login controller error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//
export const registerUsersController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await registerUserService(req.body);

        return res.status(201).json({ message: 'User created', user });
    } catch (err: any) {
        if (err.message && err.message.includes('exists')) return res.status(409).json({ message: err.message });
        console.error('Register controller error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//
export const refreshController = async (req: Request, res: Response): Promise<Response> => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'refreshToken required' });

    try {
        const tokens = await refreshTokenService(refreshToken);
        return res.json(tokens);
    } catch (err: any) {
        console.error('Refresh controller error:', err);
        return res.status(403).json({ message: 'Invalid or expired refresh token' });
    }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//
export const logoutController = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  if (!userId) return res.status(401).json({ message: 'Not authenticated' });

  try {
    await logoutService(userId);
    return res.json({ message: 'Logged out' });
  } catch (err) {
    console.error('Logout controller error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
