import { BaseResponse } from "./baseInterface.interface";

export interface StadesResponse extends BaseResponse{
    data:       Stades[];
}

export interface Stades {
    id:          string;
    nombre:      string;
    descripcion: string;
    created_at:  Date;
    updated_at:  Date;
    deleted_at:  null;
}
