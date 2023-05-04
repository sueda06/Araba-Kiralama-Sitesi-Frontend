import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCart } from '../models/creditCart';
import { DataResponseModel } from '../models/dataResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BankService {
apiUrl="https://localhost:44366/api/banks/"

  constructor(private httpClient:HttpClient) { }

  pay(amount:number):Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl+"pay?amount="+amount);
  }
  getByCart(id:number):Observable<ListResponseModel<CreditCart>>{
    return this.httpClient.get<ListResponseModel<CreditCart>>(this.apiUrl+"getbycart?id="+id);
  }
  addCreditCart(creditCart:CreditCart):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",creditCart);
  }
}
