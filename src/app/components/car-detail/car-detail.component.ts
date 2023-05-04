import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
carImages:CarImage[]
car:Car
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService,private cartService:CartService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {this.activatedRoute.params.subscribe(params => {
    if(params["carId"]){
      this.getCarDetails(params["carId"])
      this.getCarImagesByCarId(params["carId"])
    }
  })
  }
  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCar(carId).subscribe(response => {
      this.carImages=response.data;
    })
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId).subscribe(response => {
      this.car=response.data[0];
    })
  }
  addToCart(car:Car){
    this.cartService.addToCart(car);
    this.toastrService.success("Sepete Eklendi",car.description)
  }
}
