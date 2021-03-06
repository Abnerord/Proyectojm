import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {VariablesglobalesService} from '../../variablesglobales.service';

@Component({
  selector: 'app-capitulocinco',
  templateUrl: './capitulocinco.component.html',
  styles: [],
  providers: [  NgbTabsetConfig    ]
})
export class CapitulocincoComponent implements OnInit {
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
  articulos = [{articulo:"Artículo 46. Informe de Cumplimiento",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:"Se debe cumplir con un procedimiento de autoevaluación a través de herramientas digitales, para la remisión de la información requerida, en los plazos y en forma en que se determine mediante instructivo.",vermas:"Ver mas..",recomendaciones:"",numero:46},
  {articulo:"Artículo 47. Requerimientos Adicionales",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"La superintendencia del sistema financiero y los órganos reguladores sub sectoriales que apoyen al a gestión del programa de seguridad cibernética y de la información.",vermas:"Ver mas..",recomendaciones:"",numero:47},
  {articulo:"Artículo 48. verificación de entes reguladores y supervisores",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:"Se podrá verificar la idoneidad del cumplimiento del programa de seguridad cibernética y de la información de sus entes regulados, así como de la evaluación independiente de la eficacia de dicha gestión.",vermas:"Ver mas..",recomendaciones:"",numero:48}];

//preguntas es el array que guarda las preguntas de cada articulo
//es importante resaltar que los segmentos de preguntas deben ir en el orden en el que se ingresaron los articulos en la variable articulos.
//si en la variable articulos en primer lugar esta un articulo, se debe de poner en primer lugar sus preguntas en el array preguntas.
//en este array no se debe modificar nada, mas que las variables pregunta, indice, y recomendaciones.
//pregunta guarda la pregunta del articulo, indice guarda el numero que le corresponde a esa pregunta,validacion es la varibale encargada de habilitar el uso del barrating
//color es la variable encargada de guardar el color que le corresponde a esa pregunta segun su puntuacion de madurez.
//progres calcula el porcentaje de la barra de progreso.
//currenRate guarda el nivel de madurez de la pregunta.
//recomendaciones, guarda las tres recomendaciones de cada pregunta. 
preguntas = [[{pregunta :"¿se efectua la autoevluación a traves de herramientas digitales para la remision de la informacion requerida.?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["adherirse a las entidades reguladores para el acceso a las herramientas solicitadas", "crear un plan que regularice el uso de las herramientas y asignar responsabilidades", "capacitación constante ante nuevas herramientas digitales"]},
                    ],[
                {pregunta:"¿la disponibilidad de informacion hacia terceros es prioridad?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Diseño de un sistema de alta disponibilidad mediante estándarescomo thiers. ", "aplicación del diseño estandarizado, y asegurar la data.", "mejora de controles, como asegurar la información, back-up, sitios redundantes, mínimo dos enlaces, etc."]},
                      {pregunta:" ¿la información sobre la Gestióin de seguridad  Cibernética esta disponible para terceros?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear un entidad o comité ejecutivo encargado de la capacitación y concientización de uso de las tecnologías de manera adecuada.", "capacitación de usuarios, sobre el manejo de la información de manera adecuada. ", "implementación de mejora continua y buenas prácticas."]},

              ],[
                {pregunta:"¿la superintedencia  de sistemas financieros y otros organos verifican del cumpliento de forma adecuad?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["adherirse a la entidad reguladora del país.", "adaptar las metodologías de buenas prácticas que propone los sistemas reguladores.", "mejora continua"]},
                      {pregunta:" ¿la evaluacion de cumplimiento es a menudo aplicada ?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear un estrategia de monitoreo y control periódicamente y salvaguardar la información.", "evaluación constantes para verificar el cumplimiento.", "mejora continua."]}
                
              ] ]
  
  
  constructor(config: NgbTabsetConfig,private router: Router,public bd: VariablesglobalesService) {// customize default values of tabsets used by this component tree
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
      guardar(){

        let year = this.fecha.year;
        let month = this.fecha.month;
        let day = this.fecha.day;
        let date = year+"-"+month+"-"+day;
           
        let idart = 0;
        
        for(let key in this.articulos){
          this.bd.ingresoArticulo(this.articulos[key].articulo,this.articulos[key].descripcion,this.articulos[key].madurez,this.articulos[key].recomendaciones,
            this.articulos[key].subtotal,this.articulos[key].subpuntuacion,this.bd.usuariologin.id,date,this.articulos[key].numero,this.articulos[key].colorm).subscribe((data: Response)=>{
             
              for(let k in data){
                idart = data[k];
                }
                  for(let x in this.preguntas[key]){
                    this.bd.ingresoPregunta(this.preguntas[key][x].pregunta,this.articulos[key].numero,this.preguntas[key][x].currentRate,this.preguntas[key][x].progres,idart).subscribe((data: Response)=>{})
                  }
                    
          
            })
  
        }
  
        this.router.navigate(['/Titulotres/Capitulouno']);
  
        }
  ngOnInit() {
  }

}
