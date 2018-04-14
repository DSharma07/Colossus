import { async, inject, TestBed } from "@angular/core/testing";
import { HttpModule } from "@angular/http";
import { CartItem } from "app/models/cart-item.model";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { ApiProvider } from "app/providers/api.provider";
import { LocalStorageServie, StorageService } from "app/providers/storage.provider";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ShoppingCartComponent } from "../shopping-cart/shopping-cart.component";
import { ItemListComponent } from "./item-list"
import { iterateListLike } from "@angular/core/src/change_detection/change_detection_util";
import 'rxjs/add/observable/from';

const PRODUCT_1 = new Product();
PRODUCT_1.image = "Product 1";
PRODUCT_1.label = "1";
PRODUCT_1.cost = 1;
PRODUCT_1.ref = "desc1";

const PRODUCT_2 = new Product();
PRODUCT_2.image = "Product 2";
PRODUCT_2.label = "2";
PRODUCT_2.cost = 2;
PRODUCT_2.ref = "desc2";

// tslint:disable-next-line:max-classes-per-file
class MockProductDataService extends ApiProvider {
  public all(): Observable<Product[]> {
    return Observable.from([[PRODUCT_1, PRODUCT_2]]);
  }
}

// tslint:disable-next-line:max-classes-per-file
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

  public addItem(product: Product, quantity: number): void {}

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

describe("ItemListComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShoppingCartComponent
      ],
      imports: [
        HttpModule
      ],
      providers: [
       { provide: ApiProvider, useClass: MockProductDataService },
       { provide: StorageService, useClass: LocalStorageServie }
     ]
    }).compileComponents();
  }));


  it("should display all the products", async(() => {
    const fixture = TestBed.createComponent(ItemListComponent);
    fixture.detectChanges();

    const component = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    const productElements = compiled.querySelectorAll(".product-container");
    expect(productElements.length).toEqual(2);

    expect(productElements[0].querySelector(".js-product-name").textContent).toEqual(PRODUCT_1.label);
    expect(productElements[0].querySelector(".js-product-price").textContent).toContain(PRODUCT_1.cost);
    expect(productElements[0].querySelector(".js-product-desc").textContent).toContain(PRODUCT_1.ref);

    expect(productElements[1].querySelector(".js-product-name").textContent).toEqual(PRODUCT_2.label);
    expect(productElements[1].querySelector(".js-product-price").textContent).toContain(PRODUCT_2.cost);
    expect(productElements[1].querySelector(".js-product-desc").textContent).toContain(PRODUCT_2.ref);
  }));

});
