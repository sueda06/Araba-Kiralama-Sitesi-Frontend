import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { LoginModel } from '../models/loginModel';
import { Register } from '../models/register';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiUrl="https://localhost:44366/api/auth/"

  constructor(private httpClient:HttpClient) { }
  
  login(user: LoginModel): Observable<DataResponseModel<TokenModel>> {
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl + 'login', user);
  }
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  register(user:Register):Observable<DataResponseModel<TokenModel>>{
    return this.httpClient.post<DataResponseModel<TokenModel>>(this.apiUrl+"register",user);
  }
}
