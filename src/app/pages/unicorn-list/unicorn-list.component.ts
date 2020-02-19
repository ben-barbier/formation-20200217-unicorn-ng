import {Component} from '@angular/core';
import {UnicornsService} from '../../shared/services/unicorns.service';
import {Unicorn} from '../../shared/models/unicorn.model';
import {interval} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-unicorn-list',
    templateUrl: './unicorn-list.component.html',
    styleUrls: ['./unicorn-list.component.scss'],
})
export class UnicornListComponent {

    public unicorns: Unicorn[];

    public time = new Date();

    constructor(
        private unicornsService: UnicornsService,
        private route: ActivatedRoute,
    ) {
        unicornsService.getAllWithCapacities().subscribe(result => this.unicorns = result);

        this.route.data.subscribe(e => {
            debugger;
        });

        // interval(1000).pipe(
        //     tap(i => console.log(i)),
        //     map(() => new Date()),
        // ).subscribe(time => {
        //     console.log('sub' + time);
        //     this.time = time;
        // });

    }

    public removeUnicornFromList(unicornToRemove: Unicorn) {
        this.unicornsService.delete(unicornToRemove).subscribe(() => {
            this.unicorns = this.unicorns.filter(u => u.id !== unicornToRemove.id);
        });
    }
}
