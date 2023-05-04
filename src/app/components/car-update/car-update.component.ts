import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
carUpdateForm:FormGroup
id:number
car:Car
  constructor(private carService:CarService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getById()
    this.createCarUpdateForm()
  }
getById(){
  this.activatedRoute.params.subscribe(params => {
    if(params["carId"]){
       this.id=parseInt(params["carId"])
    }})
    this.carService.getById(this.id).subscribe(response=>{
      this.car=response.data
    })
}
createCarUpdateForm(){
    this.carUpdateForm= this.formBuilder.group({
  description:["",Validators.required],
  brandId:["",Validators.required],
  colorId:["",Validators.required],
  dailyPrice:["",Validators.required],
  modelYear:["",Validators.required],
  })
  return true
}
update(){
  if(this.carUpdateForm.valid){
    let carModel =Object.assign({id:this.id},this.carUpdateForm.value)
    console.log(carModel)
    this.carService.update(carModel).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
    },responseError=>{
      if(responseError.error.Errors.length>0){
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
        }
      }
    })
  } else{
    this.toastrService.error("Formunuz eksik","Dikkat")
  }
}
}
