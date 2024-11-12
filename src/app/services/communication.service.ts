// src/app/shared/data-refresh.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataRefreshService {
    private refreshSubject = new Subject<void>();

    get refresh$() {
        return this.refreshSubject.asObservable();
    }

    triggerRefresh() {
        this.refreshSubject.next();
    }
}
