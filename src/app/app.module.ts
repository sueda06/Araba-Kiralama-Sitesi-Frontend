import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import{FormsModule, ReactiveFormsModule} from "@angular/forms";
import{BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';

import{ToastrModule} from "ngx-toastr";
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { RentalDetailsComponent } from './components/rental-details/rental-details.component';
import { BanksComponent } from './components/banks/banks.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CarComponent,
    ColorComponent,
    BrandComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    FilterPipePipe,
    CartSummaryComponent,
    RentalDetailsComponent,
    BanksComponent,
    CarAddComponent,
    ColorAddComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [ {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
