import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICart, Cart } from '../models/cart.model';
import { throwIfEmpty } from 'rxjs/operators';
import { SERVER_API_URL } from '../../app.constants';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private _cart: Cart;
    private _cartCount: number;
    public cart = new BehaviorSubject(null);
    public cartCount = new BehaviorSubject(null);

    constructor(private http: HttpClient) {}

    loadCart() {
        this.http.get<any>(SERVER_API_URL + 'compliance/api/carts').subscribe(res => {
            if (res.mesg !== undefined) {
                this.cart.next(null);
            } else {
                this.setCart(res);
            }
        });
    }

    loadCartCount() {
        this.http.get<any>(SERVER_API_URL + 'compliance/api/carts?isRequestCount=true').subscribe(res => {
            if (res.mesg !== undefined) {
                this.setCartCount(0);
            } else {
                this.setCartCount(res.requestCount);
            }
        });
    }

    getCartCount() {
        return this._cartCount;
    }

    setCartCount(count: number) {
        this._cartCount = count;
        this.cartCount.next(this._cartCount);
    }

    getCart() {
        return this._cart;
    }

    setCart(cart: ICart) {
        this._cart = cart;
        this.cart.next(cart);
    }
}
