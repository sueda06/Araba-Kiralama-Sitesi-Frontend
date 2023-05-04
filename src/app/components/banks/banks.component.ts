import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartItem } from 'src/app/models/cartItem';
import { CreditCart } from 'src/app/models/creditCart';
import { BankService } from 'src/app/services/bank.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {
cartItems:CartItem[]
totalCount:number
id:any
creditCarts:CreditCart[]
bankForm:FormGroup

  constructor(private bankService:BankService,
    private cartService:CartService,
    private localStorageService:LocalStorageService, private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getByCart()
    this.getCartItems();
    this.amountPay()
    
    this.createColorUpdateForm()
  }
  createColorUpdateForm(){
    this.bankForm= this.formBuilder.group({
    cartNumber:["",Validators.required],
    cartName:["",Validators.required],
    })
  }
getCartItems(){
  this.cartItems = this.cartService.list()
} 
amountPay(){
  this.cartItems.forEach(cartItem => {
    this.totalCount = (cartItem.car.dailyPrice)*(cartItem.quantity)
  });
}
getByCart(){
  this.id=this.localStorageService.get("id")?.toString()
  this.bankService.getByCart(this.id).subscribe(response=>{
    this.creditCarts=response.data
  })
}
addCreditCart(){
  if(this.bankForm.valid){
    let userModel =Object.assign({userId:parseInt(this.id)},this.bankForm.value)
    console.log(userModel)
    this.bankService.addCreditCart(userModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      })
    }
  } 
pay(){
this.bankService.pay(this.totalCount).subscribe(response=>{
  this.toastrService.success(response.message,"Başarılı")
});
}
}
