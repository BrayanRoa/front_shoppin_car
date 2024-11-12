import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaymentMethodsResponse } from '../interfaces/payment-methods.interface';

@Injectable({ providedIn: 'root' })
export class PaymentMethodsService {

    public baseUrl: string = `${environment.API_ENDPOINT}/payment-methods`

    constructor(private httpClient: HttpClient) { }

    public getAll(): Observable<PaymentMethodsResponse> {
        return this.httpClient.get<PaymentMethodsResponse>(this.baseUrl);
    }

}