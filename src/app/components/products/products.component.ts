import { Component, OnInit } from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10, 0)
    .subscribe(data => {
      this.products = data;
      this.offset += this.limit;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail(); //Se activa el layaout hasta que se resiva la info
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success'
    }, errorMsg => {
      window.alert(errorMsg);
      this.statusDetail = 'error';
    })
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
    // .pipe(
    //   switchMap((this.product) => this.productsService.update(product.id, {title: 'change'})),
    // )
    // .subscribe(data => {
    //   console.log(data);
    // });
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Top Bandeau manga larga',
      price: 70,
      description: 'Top estilo Bandeau de manga larga, de material transparente y ajustado. El diseño es sin hombros, lo que le da un toque atrevido y moderno, con las mangas hechas del mismo tejido translúcido. El color es un tono caqui oscuro con un patrón sutil que parece camuflaje, lo que añade un elemento interesante al diseño. El top es corto, terminando justo por encima de la cintura.',
      images: ['assets/images/product1.jpg'],
      categoryId: 2,
    }
    this.productsService.create(product)
    .subscribe(data => {
      this.products.unshift(data);
    })
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'change title',
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;

    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id == this.productChosen.id)
      this.products.splice(productIndex, 1);
      this.showProductDetail = false; //cerrar de forma automatica
    })
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data); //no se sobrescribe
      this.offset += this.limit;
    });
  }
}
