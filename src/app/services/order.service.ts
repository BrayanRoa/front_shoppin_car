import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductoResponse } from '../interfaces/products-orders.interface';
import { BaseResponseSuccess } from '../interfaces/baseInterface.interface';

interface Order {
    producto: string
    DatosUsuario: string,
    comentario: string,
    idMedioPago: string,
    idEstado: string,
    cantidad: number
}

@Injectable({ providedIn: 'root' })
export class ProductosPedidosService {

    public baseUrl: string = `${environment.API_ENDPOINT}/productos`

    constructor(private httpClient: HttpClient) { }

    public getAll(idBusiness: string): Observable<ProductoResponse> {
        const url = `${this.baseUrl}/pedidos/all?idBusiness=${idBusiness}`
        return this.httpClient.get<ProductoResponse>(url);
    }

    public getProducts(): Observable<ProductoResponse> {
        const url = `${this.baseUrl}/all`
        return this.httpClient.get<ProductoResponse>(url);
    }

    public create(order: Order): Observable<BaseResponseSuccess> {
        const url = `${this.baseUrl}/pedidos/add`;
        return this.httpClient.post<BaseResponseSuccess>(url, order);
    }

    public update(id: string, order: Order): Observable<BaseResponseSuccess> {
        console.log("ID UPDATE", id);   
        const url = `${this.baseUrl}/pedidos/update?id=${id}`;
        return this.httpClient.patch<BaseResponseSuccess>(url, order);
    }

    public delete(idPedido: string): Observable<BaseResponseSuccess> {
        const url = `${this.baseUrl}/pedidos/delete?id=${idPedido}`;
        return this.httpClient.delete<BaseResponseSuccess>(url);
    }

    public getOne(id: string): Observable<any> {
        const url = `${this.baseUrl}/pedidos/${id}`;
        return this.httpClient.get<any>(url);
    }
}