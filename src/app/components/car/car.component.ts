import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  filterText="";
  
  constructor(private carService: CarService,
    private activatedRouted:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params=>{
      if(params["colorId"]){
        this.getCarsByCategory(params["colorId"])
      }
      else if(params["brandId"]){
        this.getCarssByBrand(params["brandId"])
      }
      else{
        this.getCars()
      }
     })
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCarsByCategory(colorId:number) {
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
    })
  }
  getCarssByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
    })
  }
}
