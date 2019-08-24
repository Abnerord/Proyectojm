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

  por=0.00;
  ciento=0.00;
  porcentaje=0.00; 

  madurez = 0; 
  fecha;

  total= 0;
  colortotal ="danger";
  puntuacion = 0;
  

 articulos = [{articulo:"Articulo 6. Marco de Trabajo",subtotal:0,subpuntuacion:0,color:"danger",madurez:0},{articulo:"Articulo 7. Estructura",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0},{articulo:"Articulo 8.  Aprobación del programa de Seguridad Cibernetica y de la Información",subtotal:0,subpuntuacion:0,color:"danger",madurez:0}];
  
 preguntas = [[{pregunta :"¿Se mide el desempeño de las Tecnologias de la Informacion para detectar los problemas antes de que sea demasiado tarde?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0},
                {pregunta:"¿Se miden y reportan los riesgos, el control, el cumplimiento y el desempeño?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0},
                {pregunta:"¿Se miden y reportan los riesgos, el control, el cumplimiento y el desempeño?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0},
                {pregunta:"¿Se realiza una revision de efectividad de los controles existentes como minimo una vez al año?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0}
                    ],[
                {pregunta:"¿Existe una politica para establecer una unidad funicional de seguridad cibernetica y de la informacion y sus respectivas areas especializadas?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0},
                      {pregunta:" ¿Existen politicas para establecer un ente encargado de esta Unidad de seguridad de seguridad cibernetica y de la informacion?",indice:6,validacion:false,color:"danger",currentRate:0,progres:0},
                      {pregunta:"¿Se realiza una supervicion periodica por parte del consejo u organo societario hacia esta estructura de seguridad Cibernetica?",indice:7,validacion:false,color:"danger",currentRate:0,progres:0},
                      {pregunta:"¿Existe un procedimiento para verficiar la independencia de esta estructura sobre las areas de tecnologias de la información, negocio y operaciones.?",indice:8,validacion:false,color:"danger",currentRate:0,progres:0},
                      {pregunta:"¿Al no existir un comité funcional  ¿existe un comité de gestion de riesgos u otro que se encargue de estas funciones? Como un plan B para la de continuidad de negocios?",indice:9,validacion:false,color:"danger",currentRate:0,progres:0}
                
              ],[
                {pregunta:"¿Las Politicas del programa de seguridad Cibernetica y de la Informacion son sometidas para su aprobación al consejo u organo societario?",indice:10,validacion:false,color:"danger",currentRate:0,progres:0},
                      {pregunta:" ¿El comité funcional es el encargado del desarrollo del programa de seguridad?",indice:11,validacion:false,color:"danger",currentRate:0,progres:0},
                      {pregunta:"¿Existe un procedimiento para la aprobacion  de un nuevo reglamento?",indice:12,validacion:false,color:"danger",currentRate:0,progres:0},
                      {pregunta:"¿Existe un procedimiento para verficiar la independencia de esta estructura sobre las areas de tecnologias de la información, negocio y operaciones.?",indice:13,validacion:false,color:"danger",currentRate:0,progres:0},
                      {pregunta:"¿Existe una sancion por usar reglamentos en post de su aprobación, para el comité funcional de Seguridad Cibernetica?",indice:14,validacion:false,color:"danger",currentRate:0,progres:0}
                
              ] ]
  
  constructor(config: NgbTabsetConfig) {// customize default values of tabsets used by this component tree
    config.justify = 'center';
    config.type = 'pills'; }

   

    totales(){
      var mul;
      this.total = 0;
      this.puntuacion = 0;

      this.por = this.preguntas.length - 1;
      this.ciento = this.preguntas[this.por].length - 1;
      this.porcentaje = Math.round(((100/(this.preguntas[this.por][this.ciento].indice))/5)*100)/100;



      for(var z=0; z < this.articulos.length; z++){
          this.articulos[z].subtotal=0;
          this.articulos[z].subpuntuacion=0;

            

            mul =  Math.round(((100/(this.preguntas[z].length))/5)*100)/100;
            
          
            for(var y = 0; y < this.preguntas[z].length ; y++){
              this.preguntas[z][y].progres = this.preguntas[z][y].currentRate * 20;
              this.articulos[z].subtotal = this.articulos[z].subtotal + (this.preguntas[z][y].currentRate * mul);
              this.articulos[z].subpuntuacion =  this.articulos[z].subpuntuacion + this.preguntas[z][y].currentRate;
              this.total = Math.round(( this.total + (this.preguntas[z][y].currentRate * this.porcentaje))*100)/100;
              this.puntuacion = this.puntuacion + this.preguntas[z][y].currentRate;
              
              if (this.preguntas[z][y].currentRate == 5){
                this.preguntas[z][y].color = "primary";
                }else if (this.preguntas[z][y].currentRate == 4){
                  this.preguntas[z][y].color = "success";
                }else if (this.preguntas[z][y].currentRate == 3){
                  this.preguntas[z][y].color = "warning";
                  }else if (this.preguntas[z][y].currentRate == 2){
                    this.preguntas[z][y].color = "warning";
                    }else if (this.preguntas[z][y].currentRate == 1){
                      this.preguntas[z][y].color = "danger";
                      }

                      if(y == 0 && this.preguntas[z][y].validacion == true ){
                        this.articulos[z].madurez = this.preguntas[z][y].currentRate;
                      }else if (y > 0 && this.preguntas[z][y].validacion == true){
                        if(this.preguntas[z][y].currentRate< this.articulos[z].madurez){
                            this.articulos[z].madurez = this.preguntas[z][y].currentRate;
                        }
                      }

            }
            
              if (this.articulos[z].subtotal > 30 && this.articulos[z].subtotal < 70){
            this.articulos[z].color = "warning";
            }else if (this.articulos[z].subtotal >= 70){
              this.articulos[z].color = "success";
                if(this.articulos[z].subtotal> 100){ this.articulos[z].subtotal= 100}
            }else{
              this.articulos[z].color = "danger";
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
