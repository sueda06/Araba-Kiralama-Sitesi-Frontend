import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm:FormGroup
  id:number
  user:User
  email:any
  password:any
    constructor(private userService:UserService,
      private toastrService:ToastrService,
      private localStorageService:LocalStorageService,
      private activatedRoute:ActivatedRoute,
      private formBuilder:FormBuilder,private authService:AuthService) { }
  
    ngOnInit(): void {
      this.getById()
      this.createColorUpdateForm()
        }
        getById(){
          this.activatedRoute.params.subscribe(params => {
            if(params["userId"]){
               this.id=parseInt(params["userId"])
            }})
            this.email=this.localStorageService.get("email")?.toString()
           this.userService.getByMail(this.email).subscribe(response=>{
            this.user=response.data
           })
           this.password=this.localStorageService.get("password")?.toString()
        }
      createColorUpdateForm(){
        this.userUpdateForm= this.formBuilder.group({
        firstName:["",Validators.required],
        lastName:["",Validators.required],
        email:["",Validators.required],
        password:["",Validators.required],
        })
      }
      update(){
        if(this.userUpdateForm.valid){
          let userModel =Object.assign({id:this.id},this.userUpdateForm.value)
          this.userService.update(userModel).subscribe(response=>{
            let userRegisterModel =Object.assign(this.userUpdateForm.value)
            console.log(userRegisterModel)
            this.authService.register(userRegisterModel).subscribe(response=>{
              this.toastrService.success(response.message,"Başarılı")
            },responseError=>{
              if(responseError.error.Errors.length>0){
                for (let i = 0; i < responseError.error.Errors.length; i++) {
                  this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
                }
              }
            })
          })
          this.localStorageService.delete("token")
        } else{
          this.toastrService.error("Formunuz eksik","Dikkat")
        }
      }

}
