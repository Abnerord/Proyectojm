import {Component, OnInit} from '@angular/core';
import {VariablesglobalesService} from '../variablesglobales.service';
import { DayPickerComponent } from 'ngx-bootstrap';
declare const $: any;
declare var Morris: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {


  articulos: any[] = [];


  constructor(public bd: VariablesglobalesService) { }

  ngOnInit() {

    let dat = []; 
    let nivel =[];
    let mar =[];
    let count = 0;
    let numero = 0;
    let contador = 0;
    let i = 1;

      console.log(this.bd.usuariologin);
    this.bd.Articulo(this.bd.usuariologin.id).subscribe((data: Response)=>{
       
      for(let key in data){
        
        if(numero!= data[key].numero){
              i = 0;
               numero = data[key].numero
               contador = dat.length;
               dat.push({ARTICULO:data[key].numero,nivel1:data[key].madurez});

        }else{
          i++;

          Object.defineProperty(dat[contador],'nivel'+String(i+1),{
            enumerable: false,
            configurable: false,
            writable: false,
            value: data[key].madurez
          });

          if(count <= i){
            nivel.push('nivel'+String(count+1));
            mar.push('Madurez '+String(count+1));
            count++;
          }

          
        }

       

        this.articulos.push(data[key]);
        
      }      
  console.log(nivel);
  console.log(dat);
    })

    setTimeout(() => {
      $('.resource-barchart1').sparkline([5, 6, 9, 7, 8, 4, 6], {
        type: 'bar',
        barWidth: '6px',
        height: '32px',
        barColor: '#1abc9c',
        tooltipClassname: 'abc'
      });

      $('.resource-barchart2').sparkline([6, 4, 8, 7, 9, 6, 5], {
        type: 'bar',
        barWidth: '6px',
        height: '32px',
        barColor: '#1abc9c',
        tooltipClassname: 'abc'
      });

      Morris.Bar({
        element: 'morris-extra-area',
        data: dat,
        lineColors: ['#fb9678', '#7E81CB', '#01C0C8'],
        xLabels:"second",
        xkey: 'ARTICULO',
        ykeys: nivel,
        labels: mar,
        pointSize: 0,
        lineWidth: 0,
        resize: true,
        fillOpacity: 0.8,
        behaveLikeLine: true,
        gridLineColor: '#5FBEAA',
        hideHover: 'auto'

      });
    }, 1);
  }
}
