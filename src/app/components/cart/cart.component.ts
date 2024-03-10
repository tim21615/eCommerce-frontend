import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/login-response';
import { ShoppingCart, ShoppingCartResponse } from 'src/app/interfaces/shoppingCart';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ShoppingCartService } from 'src/app/service/cart/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  user?: User;
  cartList: ShoppingCartResponse[] = [];
  constructor(private cartService: ShoppingCartService, private authService: AuthServiceService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.authService.getUser().pipe(catchError(error => {
      this.router.navigate(['login']);
      return throwError(error);
    }),
      tap(user => this.user = user),
      switchMap(user => this.cartService.findCartByMemberId(user.memberId))
    ).subscribe(cartList => {
      this.cartList = cartList.map(cart => {
        let objectURL = 'data:image/jpeg;base64,' + cart.productPicture;
        cart.productPictureUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        return cart;
      })
    })
  }
}
