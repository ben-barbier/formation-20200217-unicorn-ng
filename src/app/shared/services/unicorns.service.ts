import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, from, Observable} from 'rxjs';
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
            // Unicorn[]
            flatMap(e => e),
            // Unicorn 1
            mergeMap((unicorn: Unicorn) => from(unicorn.capacities).pipe(
                // Le 1er identifiant des capacités de la licorne 1
                mergeMap(capacityId => this.capacitiesService.get(capacityId)),
                // La 1ere capacité (object) de la licorne 1
                pluck('label'),
                // Le label de la 1ere capacité de la licorne 1
                toArray(),
                // Le tableau des labels de capacités de la licorne 1
                map((capacityLabels: string[]): Unicorn => ({...unicorn, capacityLabels}))
                // La licorne 1 avec ses capacityLabels
            )),
            // Unicorn 1 avec ses capacités labels
            toArray(),
            // La liste des licornes avec leurs capacités labels
        );
    }

    public getAllWithCapacities2(): Observable<Unicorn[]> {
        return forkJoin([
            this.getAll(),
            this.capacitiesService.getAll(),
        ]).pipe(
            // TODO...
            map(([unicorns, capacities]) => {
                debugger;
                return null;
            }),
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
