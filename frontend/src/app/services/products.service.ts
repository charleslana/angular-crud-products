import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: string;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:4200/api';

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Headers', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  }

  getAll() {
    return this.http
      .get<Product[]>(`${this.baseUrl}/products`, { headers: this.headers })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getOne(id: string) {
    return this.http
      .get<Product>(`${this.baseUrl}/product/${id}`, { headers: this.headers })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  insert(product: Product) {
    return this.http
      .post<Product>(`${this.baseUrl}/product`, product, { headers: this.headers })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  update(product: Product) {
    return this.http
      .put<Product>(`${this.baseUrl}/product`, product, { headers: this.headers })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  delete(id: string) {
    return this.http
      .delete<any>(`${this.baseUrl}/product/${id}`, { headers: this.headers })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  updateActive(id: string, active: boolean) {
    return this.http
      .patch<Product>(`${this.baseUrl}/product/${id}?active=${active}`, { headers: this.headers })
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  handleError(handleError: any): import("rxjs").OperatorFunction<Product[], any> {
    throw new Error('Method not implemented.');
  }
}
