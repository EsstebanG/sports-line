//
import User from '../models/user.model.ts';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//
export const findUserByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
};

//
export const findUserById = async (id: number) => {
    return await User.findByPk(id);
};

//
export const createUser = async (data: Partial<any>) => {
    return await User.create(data);
};

// Guarda o elimina (si refreshToken es null) el refresh token del usuario.
export const saveRefreshToken = async (userId: number, refreshToken: string | null) => {
    const user = await User.findByPk(userId);
    if (!user) return null;

    // @ts-ignore
    user.refresh_token = refreshToken;
    await user.save();
    return user;
};

//
export const findUserByRefreshToken = async (token: string) => {
    return await User.findOne({ where: { refresh_token: token } });
};

