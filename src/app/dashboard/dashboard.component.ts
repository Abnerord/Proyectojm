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

      console.log(this.bd.usuariologin);
    this.bd.Articulo(this.bd.usuariologin.id).subscribe((data: Response)=>{
       
      for(let key in data){
        this.articulos.push(data[key]);
        dat.push({ARTICULO:data[key].numero,nivel:data[key].madurez})
      }      
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
        ykeys: ['nivel', 'ipad', 'itouch'],
        labels: ['Madurez A', 'Madurez B', 'Madurez C'],
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
