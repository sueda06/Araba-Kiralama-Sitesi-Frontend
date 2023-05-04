import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm:FormGroup

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
    }
    register(){
      if(this.loginForm.valid){
        let loginModel=Object.assign({},this.loginForm.value)
        this.authService.register(loginModel).subscribe(response=>{
          this.toastrService.info(response.message)
         this.localStorageService.add("token",response.data.token)
        },responseError=>{
          this.toastrService.error(responseError.error)
        })
      }
    }
}
