import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from "app/models/shopping-cart.model";
import { ApiProvider } from "app/providers/api.provider";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Router } from '@angular/router';
import { ProductDetail } from "app/models/product-detail.model";

@Component({
  selector: 'item-desc',
  templateUrl: './item-desc.html',
  styleUrls: ['./item-desc.scss']
})
export class ItemDescComponent implements OnInit {
  public href: string = "";

  public productDetail: ProductDetail ;
  
  public constructor(private productsService: ApiProvider, private router: Router) {
  }
  
   public ngOnInit(): void {
    this.href = this.router.url.split('/')[2];
    var res = this.productsService.getProduct(this.href)
                  .subscribe((data) => {
                            this.productDetail = data;
                            });
  }
}
