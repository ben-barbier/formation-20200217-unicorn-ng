import {Component} from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public cartSize: number;

    constructor(cartService: CartService) {
        cartService.cart.subscribe(cart => this.cartSize = cart.length);
    }

}
