import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { ApiProvider } from "app/providers/api.provider";
import { CartProvider } from "app/providers/cart.provider"
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Router } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'item-list',
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.scss']
})
export class ItemListComponent implements OnInit {
  public products: Observable<Product[]>;
  selectedProduct: Product;

  public constructor(private productsService: ApiProvider,
    private shoppingCartService: CartProvider, private router: Router) {
 
  }
  
   onSelect(product: Product): void {
      this.router.navigate(['/items/'+product.ref]);
    }

    public addProductToCart(product: Product): void {
      this.shoppingCartService.addItem(product, 1);
      window.location.reload();
    }
  
    public removeProductFromCart(product: Product): void {
      this.shoppingCartService.addItem(product, -1);
      window.location.reload();
    }
  
    public productInCart(product: Product): boolean {
      return Observable.create((obs: Observer<boolean>) => {
        const sub = this.shoppingCartService
                        .get()
                        .subscribe((cart) => {
                          obs.next(cart.items.some((i) => i.productId === product.ref));
                          obs.complete();
                        });
        sub.unsubscribe();
      });
    }

   public ngOnInit(): void {
    this.products = this.productsService.all();
  }
}
