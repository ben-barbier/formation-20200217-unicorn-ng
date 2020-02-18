import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Unicorn} from '../../../shared/models/unicorn.model';
import {CartService} from '../../../shared/services/cart.service';

@Component({
    selector: 'app-unicorn-card',
    templateUrl: './unicorn-card.component.html',
    styleUrls: ['./unicorn-card.component.scss']
})
export class UnicornCardComponent implements OnInit {

    @Input()
    public unicorn: Unicorn;

    @Output()
    private removed = new EventEmitter<Unicorn>();

    public isInCart: boolean;

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
        this.isInCart = this.cartService.cart.getValue().some(u => u.id === this.unicorn.id);
    }

    public toggleToCart() {
        if (this.isInCart) {
            this.cartService.removeFromCart(this.unicorn);
        } else {
            this.cartService.addToCart(this.unicorn);
        }
        this.isInCart = !this.isInCart;
    }

    public delete() {
        this.cartService.removeFromCart(this.unicorn);
        this.removed.emit(this.unicorn);
    }

}
