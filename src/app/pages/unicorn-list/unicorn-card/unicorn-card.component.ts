import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Unicorn} from '../../../shared/models/unicorn.model';
import {CartService} from '../../../shared/services/cart.service';

@Component({
    selector: 'app-unicorn-card',
    templateUrl: './unicorn-card.component.html',
    styleUrls: ['./unicorn-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnicornCardComponent implements OnInit {

    @Input()
    public unicorn: Unicorn;

    @Output()
    private removed = new EventEmitter<Unicorn>();

    public isInCart: boolean;

    constructor(private cartService: CartService,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.cartService.cart$.subscribe(cart => {
            this.isInCart = cart.some(u => u.id === this.unicorn.id);
            this.cd.markForCheck();
            this.cd.detectChanges();
        });
    }

    public toggleToCart() {
        if (this.isInCart) {
            this.cartService.removeFromCart(this.unicorn);
        } else {
            this.cartService.addToCart(this.unicorn);
        }
    }

    public delete() {
        this.cartService.removeFromCart(this.unicorn);
        this.removed.emit(this.unicorn);
    }

}
