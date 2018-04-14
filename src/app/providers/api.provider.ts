import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from "@angular/http";

import { Product } from "app/models/product.model";
import { ProductDetail } from '../models/product-detail.model';
import { CachcingServiceBase } from "./caching.provider";
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";

let count = 0;

@Injectable()
export class ApiProvider extends CachcingServiceBase{
  private API_URL: string = 'https://colossustest.herokuapp.com/api';
  private products: Observable<Product[]>;
  private productDetail: Observable<ProductDetail>;
 
  constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<Product[]> {
    return this.cache<Product[]>(() => this.products,
                                 (val: Observable<Product[]>) => this.products = val,
                                 () => this.http
                                           .get(this.API_URL+"/items.json")
                                           .map(res => res as Product[] || [])
                                           );

  }

  public getProduct(reference: string): Observable<ProductDetail> {
    return this.cache<ProductDetail>(() => this.productDetail,
                                 (val: Observable<ProductDetail>) => this.productDetail = val,
                                 () => this.http
                                           .get(this.API_URL+"/items/100001.json")
                                           .map(res => res as ProductDetail || null)
                                           );
   }
}
