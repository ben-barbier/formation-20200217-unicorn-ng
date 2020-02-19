import {Component} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public cartSize$ = this.cartService.cart$.pipe(map(cart => cart.length));

    constructor(private cartService: CartService) {
    }

}
