import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from 'src/app/interfaces/product';
import { AuthServiceService } from 'src/app/service/auth-service.service';
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

  constructor(private authService: AuthServiceService, private productService: ProductService, private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.username = user.name;
    });

    this.getAllProduct();


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
