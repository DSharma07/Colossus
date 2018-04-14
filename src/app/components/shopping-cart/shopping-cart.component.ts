import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { ApiProvider } from "app/providers/api.provider";
import { CartProvider } from "app/providers/cart.provider";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { Router } from "@angular/router";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html"
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public products: Observable<Product[]>;
  public cart: Observable<ShoppingCart>;
  public itemCount: number;

  private cartSubscription: Subscription;

  public constructor(private productsService: ApiProvider,
                      private shoppingCartService: CartProvider,private router: Router) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
    window.location.reload();
  }

  public ngOnInit(): void {
    this.products = this.productsService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
      window.location.reload();
    }
  }
}
