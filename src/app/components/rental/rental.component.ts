import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CartService } from 'src/app/services/cart.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  rentals: RentalDetail[] = [];
  cartItems:CartItem[];
  rentDate:Date;
  returnDate:Date
  message:string

  constructor(private rentalService: RentalService, 
    private cartService:CartService,
    private router:Router,private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getCartItems();
    this.getRentals();
  }
  setRentDate(){
    console.log(this.rentDate,this.returnDate)
  }
  getCartItems(){
    this.cartItems= this.cartService.list()
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
    });
  }
  addRental(){
    let rental=new Rental()
    rental.carId=this.cartItems[0].car.id;
    rental.customerId=2;
    rental.rentDate=this.rentDate;
    rental.returnDate=this.returnDate;
    this.rentalService.addRentals(rental).subscribe(response=>{
    this.router.navigateByUrl("/banks");
    this.toastrService.success(response.message)
    },responseError=>{
          this.toastrService.error(responseError.error.message,"Doğrulama hatası")
    })
  }
}
