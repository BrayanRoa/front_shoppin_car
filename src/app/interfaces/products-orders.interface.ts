import { BaseResponse } from "./baseInterface.interface";

export interface ProductoResponse extends BaseResponse {
    data: Producto[];
}

export interface Producto {
    id: string;
    precio: string;
    cantidad: number;
    id_categoria: string;
    imagen: string;
    disponible: boolean;
    descripcion: string;
    comision: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    id_business: string;
    pedidos_productos: PedidosProducto[];
}

export interface PedidosProducto {
    id: string;
    id_pedido: string;
    id_producto: string;
    cantidad: number;
    total: string;
    comision: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    pedidos: Pedidos;
}

export interface Pedidos {
    id: string;
    id_usuario: string;
    comentario: string;
    id_medio_pago: string;
    id_estado: string;
    fecha: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}