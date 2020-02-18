import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Capacity} from '../models/capacity.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CapacitiesService {

    constructor(private http: HttpClient) {
    }

    public getAll(): Observable<Capacity[]> {
        return this.http.get<Capacity[]>(`${environment.apiUrl}/capacities`);
    }

    public get(id: number): Observable<Capacity> {
        return this.http.get<Capacity>(`${environment.apiUrl}/capacities/${id}`);
    }
}
