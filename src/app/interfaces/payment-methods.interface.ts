import { BaseResponse } from "./baseInterface.interface";

export interface PaymentMethodsResponse extends BaseResponse{
    data:       PaymentMethods[];
}

export interface PaymentMethods {
    id:          string;
    metodo:      string;
    descripcion: string;
    created_at:  Date;
    updated_at:  Date;
    deleted_at:  null;
}
