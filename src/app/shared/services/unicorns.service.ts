import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {Unicorn} from '../models/unicorn.model';
import {environment} from '../../../environments/environment';
import {flatMap, map, mergeMap, pluck, toArray} from 'rxjs/operators';
import {CapacitiesService} from './capacities.service';

@Injectable({
    providedIn: 'root',
})
export class UnicornsService {

    constructor(
        private http: HttpClient,
        private capacitiesService: CapacitiesService,
    ) {
    }

    public getAll(): Observable<Unicorn[]> {
        return this.http.get<Unicorn[]>(`${environment.apiUrl}/unicorns`);
    }

    public getAllWithCapacities(): Observable<Unicorn[]> {
        return this.getAll().pipe(
            flatMap(e => e),
            mergeMap(unicorn => from(unicorn.capacities).pipe(
                mergeMap(capacityId => this.capacitiesService.get(capacityId)),
                pluck('label'),
                toArray(),
                map(capacityLabels => ({...unicorn, capacityLabels}))
            )),
            toArray(),
        );
    }

    public get(id: number): Observable<Unicorn> {
        return this.http.get<Unicorn>(`${environment.apiUrl}/unicorns/${id}`);
    }

    public delete(unicorn: Unicorn): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/unicorns/${unicorn.id}`);
    }

    public add(unicorn: Unicorn): Observable<Unicorn> {
        return this.http.post<Unicorn>(`${environment.apiUrl}/unicorns`, unicorn);
    }

    public update(unicorn: Unicorn): Observable<Unicorn> {
        return this.http.put<Unicorn>(`${environment.apiUrl}/unicorns/${unicorn.id}`, unicorn);
    }

}
