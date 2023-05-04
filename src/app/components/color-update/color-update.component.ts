import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
colorUpdateForm:FormGroup
id:number
color:Color
  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getById()
    this.createColorUpdateForm()
      }
      getById(){
        this.activatedRoute.params.subscribe(params => {
          if(params["colorId"]){
             this.id=parseInt(params["colorId"])
          }})
          this.colorService.getColor(this.id).subscribe(response=>{
            this.color=response.data
          })
      }
    createColorUpdateForm(){
      this.colorUpdateForm= this.formBuilder.group({
      name:["",Validators.required],
      })
    }
    update(){
      if(this.colorUpdateForm.valid){
        let carModel =Object.assign({id:this.id},this.colorUpdateForm.value)
        console.log(carModel)
        this.colorService.update(carModel).subscribe(response=>{
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
