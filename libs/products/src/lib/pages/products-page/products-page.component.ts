import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'environments/environment';

@Component({
  selector: 'products-products-page',
  templateUrl: './products-page.component.html',
  styles: [
  ]
})
export class ProductsPageComponent implements OnInit {
  apiURL:string;
  endSubs$: Subject<void> = new Subject();
  product: Product;
  productImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.productid) {
        this._getProduct(params.productid);
      }
    });
    this.apiURL = environment.apiUrl;
  }

  private _getProduct(id: string) {
    this.productService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe((resProduct) => {
      this.product = resProduct;
      this.builtImagesUrl(this.product.image);
    });
  }

  private builtImagesUrl(productImages:string){
    const images = productImages.split(",");
    
    for(const image of images){
      const imageURL = this.apiURL+"image/"+image;
      this.productImages.push(imageURL);
    }
  }
  
}
