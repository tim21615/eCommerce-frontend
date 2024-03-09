import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProduct() {
    let url = 'http://localhost:8080/products';
    return this.http.get<Product[]>(url);
  }

  queryProduct(query: string) {
    let url = 'http://localhost:8080/products';
    let params = new HttpParams().set('query', query);
    return this.http.get<Product[]>(url, { params: params });
  }

}
