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
    this.listProducts();
  }

  listProducts() {
    this.service.getAll().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

}
