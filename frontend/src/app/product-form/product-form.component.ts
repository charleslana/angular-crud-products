import { Component, OnInit, ViewChild } from '@angular/core';
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
  errorFields: string[];

  @ViewChild('alert') alert;

  constructor(protected route: ActivatedRoute, protected router: Router, private service: ProductsService) {
    this.product = new Product();
    this.product.active = true;
    this.errorFields = [];
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
    this.errorFields = [];

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

  isInvalidField(field) {
    return (this.errorFields.indexOf(field) !== -1);
  }

  private callbackSuccess() {
    this.router.navigate(['/products']);
  }

  private callBackError(error: any) {
    console.log(error);

    this.alert.type = 'danger';

    if (error.error.error === 'Bad Request') {
      Object.assign(error.error.validation.body.keys).forEach(field => this.errorFields.push(field));
      this.alert.message = 'Não foi possível salvar o registro. Os campos destacados estão inválidos.'
      return;
    }

    if (error.error.status === 'error') {
      this.errorFields.push('name');
      this.alert.message = error.error.message;
      return;
    }

    this.alert.message = 'Ocorreu um erro ao processar a ação.';
  }
}
