import { MemberIdRequest, ShoppingCartResponse } from './../../interfaces/shoppingCart';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ShoppingCart, ShoppingCartPK } from 'src/app/interfaces/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }

  findCartByPK(memberId: number, productId: number) {
    let url = 'http://localhost:8080/shoppingCart';
    let body = { memberId: memberId, productId: productId } as ShoppingCartPK;

    return this.http.post<ShoppingCart>(url, body);
  }

  addToCart(memberId: number, productId: number, quantity: number) {
    let url = 'http://localhost:8080/shoppingCart/insert';
    let body = { memberId: memberId, productId: productId, quantity: quantity } as ShoppingCart;

    return this.http.post<ShoppingCart>(url, body);
  }

  findCartByMemberId(memberId: number) {
    let url = 'http://localhost:8080/shoppingCart/member';
    let body = { memberId: memberId } as MemberIdRequest;

    return this.http.post<ShoppingCartResponse[]>(url, body);
  }

}
