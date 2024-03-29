import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import {ResponseModel} from '../models/responseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44366/api/rentals/";

  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<RentalDetail>>{
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl+"getrentaldetail");
  }
  addRentals(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",rental);
  }
 
}
