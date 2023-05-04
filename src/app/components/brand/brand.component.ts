import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ColorComponent } from '../color/color.component';

@Component({
  selector: 'app-brand',
  templateUrl:'./brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  brand:Brand;
  currentBrand:Brand;

  constructor(private brandService: BrandService, private router:Router) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
getCarsFilter(){
  this.router.navigateByUrl("/cars/brand/"+this.brand.id)
}
updateObj(id: string) {
  this.brandService.getBrand(~~id).subscribe((response) => {
    this.brand = response.data;
  });
}
getUpdate(){
  this.router.navigateByUrl("/brands/update/"+this.brand.id)
}
}
