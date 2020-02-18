import {Component} from '@angular/core';
import {UnicornsService} from '../../shared/services/unicorns.service';
import {Unicorn} from '../../shared/models/unicorn.model';

@Component({
    selector: 'app-unicorn-list',
    templateUrl: './unicorn-list.component.html',
    styleUrls: ['./unicorn-list.component.scss'],
})
export class UnicornListComponent {

    public unicorns: Unicorn[];

    constructor(private unicornsService: UnicornsService) {
        unicornsService.getAllWithCapacities().subscribe(result => this.unicorns = result);
    }

    public removeUnicornFromList(unicornToRemove: Unicorn) {
        this.unicornsService.delete(unicornToRemove).subscribe(() => {
            this.unicorns = this.unicorns.filter(u => u.id !== unicornToRemove.id);
        });
    }
}
