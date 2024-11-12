import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StadesResponse } from '../interfaces/stade.interface';

@Injectable({ providedIn: 'root' })
export class StadesService {

    public baseUrl: string = `${environment.API_ENDPOINT}/stade`

    constructor(private httpClient: HttpClient) { }

    public getAll(): Observable<StadesResponse> {
        return this.httpClient.get<StadesResponse>(this.baseUrl);
    }

}