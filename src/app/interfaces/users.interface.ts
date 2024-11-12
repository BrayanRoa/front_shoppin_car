export interface UserResponse{
    rta: boolean;
    message: string;
    httpStatus: number;
    data: User[];
}

export interface User {
    id: string;
    nombre: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
