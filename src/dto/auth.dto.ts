//
export interface RegisterDTO {
    full_name: string;
    email: string;
    password: string;
    role?: 'admin' | 'regular';
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//
export interface LoginDTO {
    email: string;
    password: string;
}
