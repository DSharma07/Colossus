import { async, inject, TestBed } from "@angular/core/testing";
import { CartItem } from "app/models/cart-item.model";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { ApiProvider } from "app/providers/api.provider";
import { CartProvider } from "app/providers/cart.provider";
import { LocalStorageServie, StorageService } from "app/providers/storage.provider";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import * as sinon from "sinon";
import { CheckoutComponent } from "./checkout";

class MockShoppingCartService {
  public unsubscriveCalled: boolean = false;
  public emptyCalled: boolean = false;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscriber: Observer<ShoppingCart>;
  private cart: ShoppingCart = new ShoppingCart();

  public constructor() {
    this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscriber = observer;
      observer.next(this.cart);
      return () => this.unsubscriveCalled = true;
    });
  }

  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

  public empty(): void {
    this.emptyCalled = true;
  }

  public dispatchCart(cart: ShoppingCart): void {
    this.cart = cart;
    if (this.subscriber) {
      this.subscriber.next(cart);
    }
  }
}

describe("CheckoutComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckoutComponent
      ],
      providers: [
        { provide: ApiProvider, useValue: sinon.createStubInstance(ApiProvider) },
        { provide: StorageService, useClass: LocalStorageServie },
        { provide: CartProvider, useClass: MockShoppingCartService }
      ]
    }).compileComponents();
  }));

  it("should create the component", async(() => {
    const fixture = TestBed.createComponent(CheckoutComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));

  it("should render gross total of shopping cart",
    async(inject([CartProvider], (service: MockShoppingCartService) => {
      const fixture = TestBed.createComponent(CheckoutComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector(".js-cart-total").textContent).toContain("£0.00");

      const newCart = new ShoppingCart();
      newCart.grossTotal = 1.5;
      service.dispatchCart(newCart);
      fixture.detectChanges();
      expect(compiled.querySelector(".js-cart-total").textContent).toContain("£1.50");
    })));

  it("should empty the cart when empty shopping cart button pressed",
    async(inject([CartProvider], (service: MockShoppingCartService) => {
      const newCart = new ShoppingCart();
      const cartItem = new CartItem();
      cartItem.quantity = 1;
      newCart.grossTotal = 1.5;
      newCart.items = [cartItem];
      service.dispatchCart(newCart);
      const fixture = TestBed.createComponent(CheckoutComponent);
      fixture.detectChanges();
      fixture.debugElement.nativeElement.querySelector(".js-btn-empty-cart").click();
      expect(service.emptyCalled).toBeTruthy();
    })));
});
