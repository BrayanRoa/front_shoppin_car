import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.dev';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from '../interfaces/users.interface';

@Injectable({ providedIn: 'root' })
export class UserService {

    public baseUrl: string = `${environment.API_ENDPOINT}/usuarios`

    constructor(private httpClient: HttpClient) { }

    public getAll(): Observable<UserResponse> {
        return this.httpClient.get<UserResponse>(this.baseUrl);
    }

}