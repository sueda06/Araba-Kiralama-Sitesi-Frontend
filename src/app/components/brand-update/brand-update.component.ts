import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
brandUpdateForm:FormGroup
id:number
brand:Brand

  constructor(private brandService:BrandService,private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getById()
this.createBrandUpdateForm()
  }
  getById(){
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"]){
         this.id=parseInt(params["brandId"])
      }})
      this.brandService.getBrand(this.id).subscribe(response=>{
        this.brand=response.data
      })
  }
createBrandUpdateForm(){
  this.brandUpdateForm= this.formBuilder.group({
  name:["",Validators.required],
  })
}
update(){
  if(this.brandUpdateForm.valid){
    let carModel =Object.assign({id:this.id},this.brandUpdateForm.value)
    console.log(carModel)
    this.brandService.update(carModel).subscribe(response=>{
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
