import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header';
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { ItemListComponent } from './components/item-list/item-list';
import { ItemDescComponent } from './components/item-desc/item-desc';
import { CheckoutComponent } from './components/checkout/checkout';

// Providers
import { CartProvider } from './providers/cart.provider';
import { ApiProvider } from './providers/api.provider';
import { LocalStorageServie, StorageService } from "./providers/storage.provider";

// Routes
const routes: Routes = [
  { path: 'items', component: ItemListComponent },
  { path: 'items/:ref', component: ItemDescComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: 'items' },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CartProvider,
    ApiProvider,
    LocalStorageServie,
    { provide: StorageService, useClass: LocalStorageServie }
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemListComponent,
    ItemDescComponent,
    CheckoutComponent,
    ShoppingCartComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
