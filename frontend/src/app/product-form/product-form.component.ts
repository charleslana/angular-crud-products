import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product;

  constructor(protected route: ActivatedRoute, protected router: Router, private service: ProductsService) {
    this.product = new Product();
    this.product.active = true;
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne() {
    let id: string = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.service.getOne(id).subscribe((product: Product) => this.product = product);
    }
  }

  save() {
    if (this.product.id) {
      return this.service.update(this.product).subscribe(
        (data: any) => this.callbackSuccess(),
        (error: any) => {
          this.callBackError(error)
        }
      );
    }
    this.service.insert(this.product).subscribe(
      (data: any) => this.callbackSuccess(),
      (error: any) => {
        this.callBackError(error)
      }
    );
  }

  private callbackSuccess() {
    this.router.navigate(['/products']);
  }

  private callBackError(error: any) {
    alert('Ocorreu um erro ao salvar');
    console.log(error);
  }
}
