import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { Register } from '../models/register';
import { ResponseModel } from '../models/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44366/api/users/';

  constructor(private httpClient: HttpClient) {}

  getByMail(email: string): Observable<DataResponseModel<User>> {
    return this.httpClient.get<DataResponseModel<User>>(this.apiUrl +"getbymail?email="+ email);
  }
  update(user:Register):Observable<ResponseModel>{
return this.httpClient.post<ResponseModel>(this.apiUrl+"update",user)
  }
}
