import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor:Brand;
  c:Color;

  constructor(private colorService: ColorService, private router:Router) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getCarsFilter(){
    this.router.navigateByUrl("/cars/color/"+this.c.id)
    }
  updateObj(id: string) {
    this.colorService.getColor(~~id).subscribe(response=>{
      this.c=response.data;
    })
   console.log(id);
  }
  getUpdate(){
    this.router.navigateByUrl("/colors/update/"+this.c.id)
  }
}
