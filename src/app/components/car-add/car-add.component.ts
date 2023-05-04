import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

carAddForm:FormGroup;

  constructor(private carService:CarService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder ) { }

  ngOnInit(): void {
    this.createCarAddForm()
  }
  createCarAddForm(){
    this.carAddForm= this.formBuilder.group({
      description:["",Validators.required],
    brandId:["",Validators.required],
    colorId:["",Validators.required],
    dailyPrice:["",Validators.required],
    modelYear:["",Validators.required],
    })
  }
add(){
  if(this.carAddForm.valid){
    let carModel =Object.assign({},this.carAddForm.value)
    this.carService.add(carModel).subscribe(response=>{
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

