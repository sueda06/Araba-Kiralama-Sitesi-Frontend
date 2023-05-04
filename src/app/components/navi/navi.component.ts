import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  firstName:any
  lastName:any
  email:any
  password:any

  constructor(private router:Router, private authService:AuthService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getName()
  }
route(){
  this.router.navigate(["login"])
}
routeHome(){
  this.router.navigate([""])
}
routeUser(){
  this.router.navigate(["users/update/"+this.localStorageService.get("id")?.toString()])
}
authanticated(){
  return this.authService.isAuthenticated()
}
getName(){
 this.firstName= this.localStorageService.get("ad")
 this.lastName= this.localStorageService.get("soyad")?.toString()
 this.email=this.localStorageService.get("email")?.toString()
 this.password=this.localStorageService.get("password")?.toString()
}
}
