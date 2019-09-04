import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {VariablesglobalesService} from '../../variablesglobales.service';

@Component({
  selector: 'app-capitulouno',
  templateUrl: './capitulouno.component.html',
  styles: [],
  providers: [  NgbTabsetConfig    ]
})
export class CapitulounoComponent implements OnInit {
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
articulos = [{articulo:"Articulo 59. Sanciones.",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:"Las entidades de intermediación financiera y las entidades públicas de intermediación financiera que infrinjan cualesquiera disposiciones contenidas en este reglamento.",vermas:"Ver mas..",recomendaciones:"",numero:59},
            {articulo:"Articulo 60 Medidas Precautorias",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"se debe suspender temporalmente de su participación si incumplen con el reglamento, como medida precautoria y para minimizar el riesgo sistémico.",vermas:"Ver mas..",recomendaciones:"",numero:60},
            ];
//preguntas es el array que guarda las preguntas de cada articulo
//es importante resaltar que los segmentos de preguntas deben ir en el orden en el que se ingresaron los articulos en la variable articulos.
//si en la variable articulos en primer lugar esta un articulo, se debe de poner en primer lugar sus preguntas en el array preguntas.
//en este array no se debe modificar nada, mas que las variables pregunta, indice, y recomendaciones.
//pregunta guarda la pregunta del articulo, indice guarda el numero que le corresponde a esa pregunta,validacion es la varibale encargada de habilitar el uso del barrating
//color es la variable encargada de guardar el color que le corresponde a esa pregunta segun su puntuacion de madurez.
//progres calcula el porcentaje de la barra de progreso.
//currenRate guarda el nivel de madurez de la pregunta.
//recomendaciones, guarda las tres recomendaciones de cada pregunta. 
preguntas = [[{pregunta :"¿Verificar que el reglamento aplique las sanciones a quienes  inflijan sus normas?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Informar sobre la inexistencia de un reglamento de sanciones.", "Existen sanciones definidas en el reglamento, pero no se están aplicando correctamente.", "Monitorear la aplicación de la sanción."]},
              {pregunta:"¿Verificar que los instructivos creados puedan ser aplicados a la ley monetaria y finaciera?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Informar el incumplimiento de los instructivos en las áreas correspondientes.", "Existen los instructivos, pero no se aplican correctamente.", "Monitorear la aplicación de los instructivos a las entidades monetaria y financiera."]},
                  ],[
              {pregunta:"¿Verificar que que las entidades de apoyo y servicios conexos mantenga la interconexion o intercambio de información reciban una sansión en caso de incumplir con lo anterior.?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Informar sobre el incumplimiento de sanciones.", "No se están aplicando correctamente las sanciones para el interconexión o intercambio de información.", "Monitorear el apoyo y servicios conexos."]},
                    {pregunta:" ¿Verificar como medida precautoria, el Banco Central suspenda temporalmente a los porticipantes de SIPARD que incumplan con el relgamento para disminuir el riesgo.?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Incumplimiento sobre de la suspensión de los miembros de los miembros del SIPARD.", "No se aplican de forma apropiada las sanciones.", "Monitorear a los miembros del SIPARD que hayan sido."]},
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

      this.router.navigate(['/Titulocuatro/Capitulodos']);

      }
  ngOnInit() {
  }

}
