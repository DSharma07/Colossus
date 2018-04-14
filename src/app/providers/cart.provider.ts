import { Injectable } from "@angular/core";
import { StorageService } from "app/providers/storage.provider";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { CartItem } from "../models/cart-item.model";
import { Product } from "../models/product.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { ApiProvider } from "app/providers/api.provider";


const CART_KEY = "cart";

@Injectable()
export class CartProvider {
    private storage: Storage;
    private subscriptionObservable: Observable<ShoppingCart>;
    private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
    private products: Product[];

    public constructor(private storageService: StorageService,
        private productService: ApiProvider) {
        this.storage = this.storageService.get();
        this.productService.all().subscribe((products) => this.products = products);

        this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
            this.subscribers.push(observer);
            observer.next(this.retrieve());
            return () => {
              this.subscribers = this.subscribers.filter((obs) => obs !== observer);
            };
          });
    }

    public get(): Observable<ShoppingCart> {
        return this.subscriptionObservable;
      }

      public addItem(product: Product, quantity: number): void {
        const cart = this.retrieve();
        let item = cart.items.find((p) => p.productId === product.ref);
        if (item === undefined) {
          item = new CartItem();
          item.productId = product.ref;
          cart.items.push(item);
        }
    
        item.quantity += quantity;
        cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
        if (cart.items.length === 0) {
          cart.deliveryOptionId = undefined;
        }
    
        this.calculateCart(cart);
        this.save(cart);
      }
    
      public empty(): void {
        const newCart = new ShoppingCart();
        this.save(newCart);
      }

      private calculateCart(cart: ShoppingCart): void {
        cart.itemsTotal = cart.items
                              .map((item) => item.quantity * this.products.find((p) => p.ref === item.productId).cost)
                              .reduce((previous, current) => previous + current, 0);
        cart.grossTotal = cart.itemsTotal;
      }
    
      private retrieve(): ShoppingCart {
        const cart = new ShoppingCart();
        const storedCart = this.storage.getItem(CART_KEY);
        if (storedCart) {
          cart.updateFrom(JSON.parse(storedCart));
        }
    
        return cart;
      }
    
      private save(cart: ShoppingCart): void {
        this.storage.setItem(CART_KEY, JSON.stringify(cart));
      }
    
}
