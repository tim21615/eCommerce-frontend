import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ShoppingCartService } from 'src/app/service/cart/shopping-cart.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username: string = '';
  products: Product[] = [];
  searchText: string = '';

  constructor(private authService: AuthServiceService, private productService: ProductService, private shoppingCartService: ShoppingCartService, private sanitizer: DomSanitizer, private router: Router, private messageService: MessageService) { }
  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.username = user.name;
    });

    this.getAllProduct();


  }

  addToCart(productId: number, stock: number) {
    let memberId: number;
    if (localStorage.getItem('token')) {
      this.authService.getUser().pipe(tap(user => memberId = user.memberId),
        switchMap(() => this.shoppingCartService.findCartByPK(memberId, productId)),
        switchMap(shoppingCart =>
          shoppingCart === null ? this.shoppingCartService.addToCart(memberId, productId, 1)
            : shoppingCart.quantity < stock ? this.shoppingCartService.addToCart(memberId, productId, shoppingCart.quantity + 1)
              : of(null)
        )).subscribe(res => {
          if (res) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: '成功新增購物車' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: '購物車數量已超過庫存!' });
          }
        })
    } else {
      this.router.navigate(['login']);
    }
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(products => {
      this.products = products.map(product => {
        let objectURL = 'data:image/jpeg;base64,' + product.productPicture;
        product.productPictureUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        product.inventoryStatus = (product.stock! >= 10) ? 'INSTOCK' : (product.stock! > 0) ? 'LOWSTOCK' : 'OUTOFSTOCK';
        return product;
      })
    })
  }

  search() {
    if (this.searchText) {
      this.productService.queryProduct(this.searchText).subscribe(products => {
        this.products = products.map(product => {
          let objectURL = 'data:image/jpeg;base64,' + product.productPicture;
          product.productPictureUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          product.inventoryStatus = (product.stock! >= 10) ? 'INSTOCK' : (product.stock! > 0) ? 'LOWSTOCK' : 'OUTOFSTOCK';
          return product;
        })
      });
    } else {
      this.getAllProduct();
    }
  }

  getSeverity(product: Product): string {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return 'success';
    }
  };

  logout() {
    this.authService.logout();
  }
}
