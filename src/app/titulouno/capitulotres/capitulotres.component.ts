import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-capitulotres',
  templateUrl: './capitulotres.component.html',
  styles: [ `
  .star {
    font-size: 2.0rem;
    color: #b0c4de;
    select: none; -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; }

  .filled {
    color: #F5D11E;
  }
`],
providers: [  NgbTabsetConfig    ]
})
export class CapitulotresComponent implements OnInit {
  fecha;
  currentRate = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  total= 0;
  colortotal ="danger";
  subtotal =[0,0,0,0,0,0,0];
  subpuntuacion = [0,0,0,0,0,0,0]
  puntuacion = 0;
  validacion =[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
  color = ["danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger"];

  constructor(config: NgbTabsetConfig) {// customize default values of tabsets used by this component tree
    config.justify = 'center';
    config.type = 'pills'; }

    totales(){
      var final,inicio,mul;
      this.total = 0;
      this.puntuacion = 0;

      for(var z=0; z < 7; z++){
          this.subtotal[z]=0;
          this.subpuntuacion[z]=0;

          if(z==0){
             inicio = 0;
             final = 3;
             mul = 5
            }
          if(z==1){
              inicio = 4;
              final = 8;
              mul = 4;
             }
          if(z==2){
              inicio = 9;
              final = 13;
              mul = 4;
             }
          if(z==3){
              inicio = 14;
              final = 19;
              mul = 3.5;
             }
          if(z==4){
              inicio = 20;
              final = 27;
              mul = 2.5;
             }
          if(z==5){
              inicio = 28;
              final = 32;
              mul = 4;
             }
           if(z==6){
              inicio = 33;
              final = 35;
              mul = 7;
             }
            for(var y = inicio; y <= final; y++){
              this.subtotal[z] = this.subtotal[z] + (this.currentRate[y] * mul);
              this.subpuntuacion[z] = this.subpuntuacion[z] + this.currentRate[y];
              this.total = this.total + (this.currentRate[y] * 0.6)
              this.puntuacion = this.puntuacion + this.currentRate[y];
              }
            if (this.subtotal[z] > 30 && this.subtotal[z] < 70){
            this.color[z] = "warning";
            }else if (this.subtotal[z] >= 70){
            this.color[z] = "success";
                if(this.subtotal[z]> 100){ this.subtotal[z]= 100}
            }else{
            this.color[z] = "danger";
            }
            
            if (this.total > 30 && this.total < 70){
              this.colortotal = "warning";
              }else if (this.total >= 70){
              this.colortotal = "success";
                  if(this.total> 100){ this.total= 100}
              }else{
              this.colortotal = "danger";
              }
      }  
        
      }
  ngOnInit() {
  }

}
