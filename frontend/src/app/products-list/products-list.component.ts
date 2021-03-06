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
    this.alert.message = '';
    this.service.delete(id).subscribe(
      (data: any) => this.callbackSuccess(data.message),
      (error: any) => this.callBackError(error)
    );
  }

  toggleActive(id: string, active: boolean) {
    this.alert.message = '';
    this.service.updateActive(id, !active).subscribe(
      (data: any) => this.callbackSuccess('Alterado com sucesso.'),
      (error: any) => this.callBackError(error)
    );
  }

  private callbackSuccess(message: string) {
    this.alert.type = 'success';
    this.alert.message = message;
    this.getAll();
  }

  private callBackError(error: any) {
    console.log(error);

    this.alert.type = 'danger';

    if (error.error.status === 'error') {
      this.alert.message = error.error.message;
      return;
    }

    this.alert.message = 'Ocorreu um erro ao processar a ação.';
  }
}
