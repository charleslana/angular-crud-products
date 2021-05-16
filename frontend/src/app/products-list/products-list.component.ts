import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: Product[];

  constructor(private service: ProductsService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((products: Product[]) => this.products = products);
  }

  delete(id: string) {
    this.service.delete(id).subscribe(
      (data: any) => this.callbackSuccess(),
      (error: any) => this.callBackError(error)
    );
  }

  private callbackSuccess() {
    alert('Produto excluído com sucesso');
    this.getAll();
  }

  private callBackError(error: any) {
    alert('Ocorreu um erro ao excluir');
    console.log(error);
  }

}
