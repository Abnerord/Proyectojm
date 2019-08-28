import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-capitulotres',
  templateUrl: './capitulotres.component.html',
  styles: [ ],
providers: [  NgbTabsetConfig    ]
})
export class CapitulotresComponent implements OnInit {
//Las variables por, ciento, porcentaje ayudan a calcular el valor del total. Con estas variables se descubre el porcentaje por cada pregunta, para que su sumatario de 100%
  por=0.00;
  ciento=0.00;
  porcentaje=0.00; 

//la variable buffer ayuda a guardar el indice de la pregunta con menor valor de madurez
//la variable madurez guarda el valor neto del valor de madurez despues de todos los calculos
// ver es una variable que se utiliza para exibir las descripciones de los articulos
  buffer = 0;
  madurez = 0; 
  fecha;
  ver;

  //total, guarda el porcentaje acumulado del total
  //color total, es la variable que contiene el color de madurez del total
  //puntuacion, es la variable que suma los niveles y se utiliza para calcular porcentajes.
  total= 0;
  colortotal ="danger";
  puntuacion = 0;
  

  //articulos es el array que guarda los datos de los articulos, en este array no se debe modificar los parametros, todos son manejados por el sistema.
  //los unicos parametros que se deben modificar son articulo, descripción.
  //la variable subtotal muestra el porcentaje de este articulo, subpuntacion acumula la sumatoria de los niveles para sacar el porcentaje total
  //madurez, guarda el nivel de madurez general del articulo (por default es nivel es 0)
  //colorm, guarda el color correspondiente al nivel de madurez (por default es rojo danger o el nivel mas bajo),
  //ver mas, es la variable que se utiliza para reducir la descripcion.
  //recomendacion, guarda las recomendaciones generales de todo el articulo (por default esta vacia) 
 articulos = [{articulo:"Articulo 6. Marco de Trabajo",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:" las entidades de intermediación financiera, administradores y participantes del SIPARD, entidades públicas de intermediación financiera y las entidades de apoyo y servicios conexos, deben establecer acciones para el desarrollo, implementación y mantenimiento del programa de seguridad cibernética y de la información.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 7. Estructura",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"las entidades de intermediación financiera, administradores y participantes, deben contar con una estructura gerencial y funciones de control de seguridad cibernética y de la información, acordes a su naturaleza, tamaño, complejidad, perfil de riesgo e importancia sistémica.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 8.  Aprobación del programa de Seguridad Cibernetica y de la Información",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 9.  Responsabilidades del Comite Funcional de Seguridad Cibernetica y de la Información",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 10.  Oficial de  Seguridad Cibernetica y de la informacion",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 11.  Responsabilidades del oficial de seguridad cibernetica y de la información",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 12.  Areas Especializadas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""}];
 
//preguntas es el array que guarda las preguntas de cada articulo
//es importante resaltar que los segmentos de preguntas deben ir en el orden en el que se ingresaron los articulos en la variable articulos.
//si en la variable articulos en primer lugar esta un articulo, se debe de poner en primer lugar sus preguntas en el array preguntas.
//en este array no se debe modificar nada, mas que las variables pregunta, indice, y recomendaciones.
//pregunta guarda la pregunta del articulo, indice guarda el numero que le corresponde a esa pregunta,validacion es la varibale encargada de habilitar el uso del barrating
//color es la variable encargada de guardar el color que le corresponde a esa pregunta segun su puntuacion de madurez.
//progres calcula el porcentaje de la barra de progreso.
//currenRate guarda el nivel de madurez de la pregunta.
//recomendaciones, guarda las tres recomendaciones de cada pregunta. 
 preguntas = [[{pregunta :"¿Se mide el desempeño de las Tecnologias de la Informacion para detectar los problemas antes de que sea demasiado tarde?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1.1","hola2.1","hola3.1"]},
                {pregunta:"¿Se miden y reportan los riesgos, el control, el cumplimiento y el desempeño?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1.2","hola2.2","hola3.2"]},
                {pregunta:"¿Se miden y reportan los riesgos, el control, el cumplimiento y el desempeño?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                {pregunta:"¿Se realiza una revision de efectividad de los controles existentes como minimo una vez al año?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                    ],[
                {pregunta:"¿Existe una politica para establecer una unidad funicional de seguridad cibernetica y de la informacion y sus respectivas areas especializadas?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Existen politicas para establecer un ente encargado de esta Unidad de seguridad de seguridad cibernetica y de la informacion?",indice:6,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se realiza una supervicion periodica por parte del consejo u organo societario hacia esta estructura de seguridad Cibernetica?",indice:7,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe un procedimiento para verficiar la independencia de esta estructura sobre las areas de tecnologias de la información, negocio y operaciones.?",indice:8,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Al no existir un comité funcional  ¿existe un comité de gestion de riesgos u otro que se encargue de estas funciones? Como un plan B para la de continuidad de negocios?",indice:9,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Las Politicas del programa de seguridad Cibernetica y de la Informacion son sometidas para su aprobación al consejo u organo societario?",indice:10,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿El comité funcional es el encargado del desarrollo del programa de seguridad?",indice:11,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe un procedimiento para la aprobacion  de un nuevo reglamento?",indice:12,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe un procedimiento para verficiar la independencia de esta estructura sobre las areas de tecnologias de la información, negocio y operaciones.?",indice:13,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe una sancion por usar reglamentos en post de su aprobación, para el comité funcional de Seguridad Cibernetica?",indice:14,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Existe un procedimiento para diseñar los lineamientos funcionales de seguridad cibernetica y de la informacion?",indice:15,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe un procedimiento para la aprobacion de politicas del programa de seguridad cibernetica y de  la informacion?",indice:16,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe un control para evaluar la efectividad del programa de seguridad cibernetica y de la información ?",indice:17,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe un procedimiento para confirmar las desiciones para el tratamiento de riesgo propuestas por el oficial de seguridad cibernetica y de la informacion ?",indice:18,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe un procedimiento para comunicar al consejo u organo societario, resultados de las valoraciones del programa de seguridad cibernetica y de la informacion ?",indice:19,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe una politica que regule el cumplimiento de la comunicación entre la estructura del programa de seguridad y el consejo u organo societario?",indice:20,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:" ¿Existe un politica que establesca el perfil del oficial de la unidad funcional de seguridad cibernetica y de la información?",indice:21,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Existe un control de las aptitudes con las que debe contar el perfil del oficial de seguridad cibernetica y de la información?",indice:22,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe una politica que establezca cuales son las responsabilidades del ofical encargado del programa de seguridad cibernetica y de la información ?",indice:23,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existen sanciones establecidas por el incumplimiento de deberes y responsabilidades hacia el oficial de seguridad cibernetica y de la información?",indice:24,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se tiene establecido que el oficial de seguridad cibernetica y de la información sera miembro y secretario del comité funcional.?",indice:25,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Existe un procedimiento para que el Oficial de seguridad cibernetica y de la informacion reporte periodicamente al CSIRT la situacion de la infraestructura tecnologica a su cargo.?",indice:26,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe una politica que establezca que otra persona pueda desempeñar el cargo de Ofical interino para cumplir obligaciones y responsabilidades de este cargo.?",indice:27,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe un control de las aptitudes y requisitos que debe contar un ejecutivo para desempeñar el cargo de Oficial se seguridad cibernetica y de la informacion? ",indice:28,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Existen procedimientos de como se debe desarrollar un programa de seguridad cibernetica y de la informacion?",indice:29,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Existen procedimientos para implentar, controlar y dar manteniminto a estos programas de seguridad cibernetica y de la información?",indice:30,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existen reglamentos que permitan implementar politicas, estandares y procedimientos para apoyar el programa de seguridad cibernetica y de la informacion?",indice:31,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existen politicas que establezcan el procedimiento para el tratamiento de riesgos?",indice:32,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿existen politicas que indiquen los  niveles aceptados que permitan la gestion de riesgo?",indice:33,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Existen protocolos  para el personal tecnico encargada de estas areas especializadas?",indice:34,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Existe controles especializados para la gestion de recursos necesarios para garantizar la adecuada gestion del programa de seguridad cibernetica.?",indice:35,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe una politica que establezca que cada area especializada en el programa de seguridad cibernetica sea dirigida por un profesional nombrado por el Oficial de seguridad cibernetica?",indice:36,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ] ]
  
  constructor(config: NgbTabsetConfig) {// customize default values of tabsets used by this component tree
    config.justify = 'center';
    config.type = 'pills'; }

//El evento toggleWithGreeting es el encargado de exibir los popper o anunciones de los niveles de mardurez
    toggleWithGreeting(popover, greeting: string, language: string) {
      if (popover.isOpen()) {
        popover.close();
      } else {
        popover.open({greeting, language});
      }
    }

//El evento toggleWithGreetingdos es el encargado de exibir la imagen de la matriz de riesgos
    toggleWithGreetingdos(popover, img: string) {
      if (popover.isOpen()) {
        popover.close();
      } else {
        popover.open({img});
      }
    }

  //vermas es evento que despliega la descripcion del articulo o lo enncoje
    vermas(recibido){
      
      this.ver = this.ver === 'closed' ? 'open' : 'closed';

      if(this.ver=='open'){
        this.articulos[recibido].vermas = this.articulos[recibido].descripcion;
      }

      if(this.ver=='closed'){
        this.articulos[recibido].vermas = "Ver mas..";
      }
    }
   
//el evento totales gurda todas las operaciones matematicas que se deben realizar, para encontrar porcentajes y totales
    totales(){
      var mul;
      this.total = 0;
      this.puntuacion = 0;

//este es el segmento de progracion que se encarga de numerar todas las preguntas y dividir esa cantidad para encontrar el porcentaje de cada pregunta. Toma el indice del array preguntas como referencia para hacer el conteo.
      this.por = this.preguntas.length - 1;
      this.ciento = this.preguntas[this.por].length - 1;
      this.porcentaje = Math.round(((100/(this.preguntas[this.por][this.ciento].indice))/5)*100)/100;



      for(var z=0; z < this.articulos.length; z++){
          this.articulos[z].subtotal=0;
          this.articulos[z].subpuntuacion=0;
          this.articulos[z].recomendaciones="";
            

            mul =  Math.round(((100/(this.preguntas[z].length))/5)*100)/100;
            
          //este for recorre las preguntas de cada articulo
            for(var y = 0; y < this.preguntas[z].length ; y++){
              this.preguntas[z][y].progres = this.preguntas[z][y].currentRate * 20;
              this.articulos[z].subtotal = this.articulos[z].subtotal + (this.preguntas[z][y].currentRate * mul);
              this.articulos[z].subpuntuacion =  this.articulos[z].subpuntuacion + this.preguntas[z][y].currentRate;
              this.total = Math.round(( this.total + (this.preguntas[z][y].currentRate * this.porcentaje))*100)/100;
              this.puntuacion = this.puntuacion + this.preguntas[z][y].currentRate;
              
             //este segmento calculo el color y las recomendaciones por pregunta, segun su nivel de madurez
              if (this.preguntas[z][y].currentRate == 5){
                this.preguntas[z][y].color = "primary";
                }else if (this.preguntas[z][y].currentRate == 4){
                  this.preguntas[z][y].color = "success";
                }else if (this.preguntas[z][y].currentRate == 3){
                  this.preguntas[z][y].color = "warning";
                  this.articulos[z].recomendaciones = this.articulos[z].recomendaciones + "MODERADO-->PREGUNTA #" + (y+1).toString() + " RECOMENDACIÓN: " + this.preguntas[z][y].recomendaciones[2]+"\n";
                  }else if (this.preguntas[z][y].currentRate == 2){
                    this.preguntas[z][y].color = "warning";
                    this.articulos[z].recomendaciones =this.articulos[z].recomendaciones + "MAYOR RIESGO-->PREGUNTA #" + (y+1).toString() +  " RECOMENDACIÓN: " + this.preguntas[z][y].recomendaciones[1]+"\n";
                    }else if (this.preguntas[z][y].currentRate == 1){
                      this.preguntas[z][y].color = "danger";
                      this.articulos[z].recomendaciones = this.articulos[z].recomendaciones + "CRITICO-->PREGUNTA #" + (y+1).toString()  + " RECOMENDACIÓN: " + this.preguntas[z][y].recomendaciones[0]+ "\n";
                      }

                      if (this.preguntas[z][y].validacion == true){
                       
                        if(this.articulos[z].madurez == 0){
                          this.articulos[z].madurez = this.preguntas[z][y].currentRate;
                          this.articulos[z].colorm = this.preguntas[z][y].color;
                          this.buffer = this.preguntas[z][y].indice;
                        }else if(this.buffer == this.preguntas[z][y].indice){
                          this.articulos[z].madurez = this.preguntas[z][y].currentRate;
                          this.articulos[z].colorm = this.preguntas[z][y].color;
                        } 
                        
                        if(this.preguntas[z][y].currentRate< this.articulos[z].madurez){
                            this.articulos[z].madurez = this.preguntas[z][y].currentRate;
                            this.articulos[z].colorm = this.preguntas[z][y].color;
                            this.buffer = this.preguntas[z][y].indice;
                          }
                        
                      }

            }
            
          //este segmento le da color a la barra de progreso de cada pregunta
              if (this.articulos[z].subtotal > 30 && this.articulos[z].subtotal < 70){
            this.articulos[z].color = "warning";
            }else if (this.articulos[z].subtotal >= 70){
              this.articulos[z].color = "success";
                if(this.articulos[z].subtotal> 100){ this.articulos[z].subtotal= 100}
            }else{
              this.articulos[z].color = "danger";
            }
            
            //este segmento le da el color a la barra de progreso del total 
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
