import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanksComponent } from './components/banks/banks.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalDetailsComponent } from './components/rental-details/rental-details.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"customers", component:CustomerComponent},
  {path:"rentaldetails", component:RentalDetailsComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"cars/add", component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"cars/update/:carId", component:CarUpdateComponent},
  {path:"users/update/:userId", component:UserUpdateComponent},
  {path:"colors/add/", component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"colors/update/:colorId", component:ColorUpdateComponent},
  {path:"brands/add", component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"brands/update/:brandId", component:BrandUpdateComponent},
  {path:"banks", component:BanksComponent},
  {path:"rentals", component:RentalComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/cardetail/:carId", component:CarDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
