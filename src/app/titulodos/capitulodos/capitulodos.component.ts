import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-capitulodos',
  templateUrl: './capitulodos.component.html',
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
export class CapitulodosComponent implements OnInit {
  fecha;
  currentRate = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ,0,0,0,0,0,0,0,0 ];
  total= 0;
  colortotal ="danger";
  subtotal =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,,0,0,0];
  subpuntuacion = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,,0,0,0]
  puntuacion = 0;
  validacion =[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,
    ,false,false,false,false,false,false,false,false];
  color = ["danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger",
  "danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger",
  "danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger","danger",
  ,"danger","danger","danger","danger","danger","danger","danger","danger"];

  constructor(config: NgbTabsetConfig) { 
    config.justify = 'center';
    config.type = 'pills'; 
  }

  totales(){
    var final,inicio,mul;
    this.total = 0;
    this.puntuacion = 0;

    for(var z=0; z < 24; z++){
        this.subtotal[z]=0;
        this.subpuntuacion[z]=0;

        if(z==0){
           inicio = 0;
           final = 4;
           mul = 4
          }
        if(z==1){
            inicio = 5;
            final = 8;
            mul = 5;
           }
        if(z==2){
            inicio = 9;
            final = 13;
            mul = 4;
           }
        if(z==3){
            inicio = 14;
            final = 23;
            mul = 4;
           }
        if(z==4){
            inicio = 24;
            final = 28;
            mul = 4;
           }
        if(z==5){
            inicio = 29;
            final = 32;
            mul = 5;
           }
         if(z==6){
            inicio = 33;
            final = 36;
            mul = 5;
           }
           if(z==7){
            inicio = 37;
            final = 40;
            mul = 5;
           }
           if(z==8){
            inicio = 41;
            final = 44;
            mul = 5;
           }
           if(z==9){
            inicio = 45;
            final = 48;
            mul = 5;
           }
           if(z==10){
            inicio = 49;
            final = 52;
            mul = 5;
           }
           if(z==11){
            inicio = 53;
            final = 56;
            mul = 5;
           }
           if(z==12){
            inicio = 57;
            final = 61;
            mul = 4;
           }
           if(z==13){
            inicio = 62;
            final = 63;
            mul = 10;
           }
           if(z==14){
            inicio = 64;
            final = 68;
            mul = 4;
           }
           if(z==15){
            inicio = 69;
            final = 71;
            mul = 7;
           }
           if(z==16){
            inicio = 72;
            final = 73;
            mul = 10;
           }
           if(z==17){
            inicio = 74;
            final = 76;
            mul = 7;
           }if(z==18){
            inicio = 77;
            final = 78;
            mul = 10;
           }if(z==19){
            inicio = 79;
            final = 83;
            mul = 4;
           }if(z==20){
            inicio = 84;
            final = 88;
            mul = 4;
           }if(z==21){
            inicio = 89;
            final = 93;
            mul = 4;
           }if(z==22){
            inicio = 94;
            final = 98;
            mul = 4;
           }if(z==23){
            inicio = 99;
            final = 103;
            mul =4 ;
           }if(z==24){
            inicio = 104;
            final = 107;
            mul = 5;
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
