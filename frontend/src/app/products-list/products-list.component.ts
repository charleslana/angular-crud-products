import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[];

  @ViewChild('alert') alert;

  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((products: Product[]) => this.products = products);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(
      (data: any) => this.callbackSuccess(data.message),
      (error: any) => this.callBackError(error)
    );
  }

  private callbackSuccess(message: string) {
    this.alert.type = 'success';
    this.alert.message = message;
    this.getAll();
  }

  private callBackError(error: any) {
    this.alert.type = 'danger';
    this.alert.message = 'Ocorreu um erro ao excluir.';
    console.log(error);
  }

}
