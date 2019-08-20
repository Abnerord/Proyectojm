import { Component, OnInit } from '@angular/core';
import {BasedatosService} from './basedatos.service'

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styles: []
})
export class PruebaComponent implements OnInit {

  evento: any[]=[];

  constructor(private eventos: BasedatosService) { 
  
  }

  
  ngOnInit() {
    this.eventos.login().subscribe((data: Response)=>{
      for(let key in data){
        this.evento.push(data[key].title)
      }
      
    })
  }

}
