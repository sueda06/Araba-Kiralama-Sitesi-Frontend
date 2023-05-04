import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup
user:User
  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router,
    private localStorageService:LocalStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
    }
    login(){
      if(this.loginForm.valid){
        this.userService.getByMail(this.loginForm.getRawValue().email).subscribe(response=>{this.user=response.data})
        let loginModel=Object.assign({},this.loginForm.value)
        this.authService.login(loginModel).subscribe(response=>{
          this.toastrService.info(response.message)
         this.localStorageService.add("token",response.data.token)
         this.localStorageService.add("id",this.user.id.toString())
         this.localStorageService.add("ad",this.user.firstName)
         this.localStorageService.add("soyad",this.user.lastName)
         this.localStorageService.add("email",this.loginForm.getRawValue().email)
         this.localStorageService.add("password",this.loginForm.getRawValue().password)
        },responseError=>{
          this.toastrService.error(responseError.error)
        })
      }
    }
    route(){
     this.router.navigate(["register"])
    }
}
