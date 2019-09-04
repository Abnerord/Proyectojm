import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {VariablesglobalesService} from '../../variablesglobales.service';

@Component({
  selector: 'app-capitulouno',
  templateUrl: './capitulouno.component.html',
  styles: [ ],
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
  articulos = [{articulo:"Articulo 13. Gestion de Riesgos Tecnologicos ",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:" Deben evaluar y tratar adecuadamente los riesgos tecnológicos en sus sistemas de información, desde su concepción, desarrollo e implementación.",vermas:"Ver mas..",recomendaciones:"",numero:13},
  {articulo:"Articulo 14. Gestion de Riesgos Tecnologicos en las Entidades Interconectadas",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"Deben procurar de manera periódicas, la gestión de riesgos tecnológicos a las entidades interconectadas con las que actualmente mantengan una relación contractual.",vermas:"Ver mas..",recomendaciones:"",numero:14},
  {articulo:"Articulo 15. Metodologias de la gestión de riesgos tecnologicos.",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se debe llevar a cabo a través de metodologías estructuradas que contemplen la identificación de las amenazas y vulnerabilidades tecnológicas.",vermas:"Ver mas..",recomendaciones:"",numero:15},
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
preguntas = [[{pregunta :"¿Existe una politica que establezca un analisis de vulnerabilidades para la institucion.?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política para realizar análisis de vulnerabilidades periódicamente", "crear una política para realizar pruebas de penetración por lo menos una vez al año", "Realizar un análisis de riesgos, para identificar el nivel de seguridad de la organización"]},
{pregunta:"¿Existe una politica que establezca y  regule la evaluación de riesgos tecnológicos?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política para el análisis y evaluación de riesgos tecnológicos como mínimo una vez al año", "Crear el plan de Análisis y evaluación de riesgos tecnológicos", "Identificar los activos de la organización, (hardware, software, información, personal, accesorios, etc.)"]},
{pregunta:"¿Cuenta con un protocolo para la evaluacion de riesgos, que amenazas pordrian materializarse y cual seria la gravedad.?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política para el análisis y evaluación de riesgos tecnológicos como mínimo una vez al año", "Identificar los activos de la organización, (hardware, software, información, personal, accesorios, etc.)", "Identificar el impacto y la probabilidad de que se materialice una amenaza"]},
{pregunta:"¿Existe un procedimiento adecuado para el tratamiento del riesgos tecnologicos?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear procedimiento para Planificar e implementar el tratamiento de riesgos.", "Crear un plan de acciones para el tratamiento de riesgo: Eliminar o mitigar riesgo, Asumir riesgo, compartir el riesgo etc.", "monitoreo y revisión integral del proceso de tratamiento de riesgos"]},
{pregunta:"¿Existe una politica que establezca el monitoreo, control y mantenimietno para la gestion del riesgo tecnologico?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política que establezca la revisión integral y el monitoreo de los procesos del tratamiento de riesgos", "Crear controles para el monitoreo y revisión integral del proceso de tratamiento de riesgos", "Evaluar la efectividad del tratamiento de riesgos"]},
{pregunta:"¿Si el riesgo no se puede controlar o tratar, existe un procedimiento para trasladar a un tercero esta responsabilidad?",indice:6,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un plan de acciones para el tratamiento de riesgo: Eliminar o mitigar riesgo, Asumir riesgo, compartir el riesgo etc.", "Crear un procedimiento de las medidas o lineamientos que tiene que cumplir el tercero para transferir el riesgo, contratos de confidencialidad entre otros", "Crear controles para evaluar que la transferencia del riesgo seas tratada adecuadamente por el tercero"]}
    ],[
{pregunta:"¿Existe una politica que establezca la evaluacion o control a entidades intermediarias con la institución?",indice:7,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer políticas para que las entidades intermediarias realicen la Gestión de riesgos tecnológicos", "Establecer controles para verificar el cumplimiento de la entidades intermediarias con la implementación de Gestión de Riesgo", "Realizar una evaluación de riesgos a entidades intermediarias para determinar objetivamente cuáles son sus riesgos relevantes para la seguridad de su organización"]},
      {pregunta:" ¿Existe un control adecuado para evaluar periodicamente a las entidades intemediarias para la gestion de riesgos tecnologicos?",indice:8,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer controles para verificar el cumplimiento de la entidades intermediarias con la implementación de Gestión de Riesgo", "Realizar una evaluación de riesgos a entidades intermediarias para determinar objetivamente cuáles son sus riesgos relevantes para la seguridad de su organización", "monitorear el tratamiento del riesgo a las empresas intermediarias"]},
      {pregunta:"¿Existe una politica que establezca la sancion por incumplimiento para la evaluacion y mitagacion de riesgos a entidades intermediarias.?",indice:9,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política que establezca sanciones por incumplimiento en la implementación de Gestión de Riesgos a empresas intermediarias", "Crear políticas para establecer la interconexión a entidades de intermediación financiera cuando sus riesgos sean mayor al definido por el consejo u órgano societario", "Crear políticas para sancionar preventivamente a entidades de intermediación financiera cuando la evaluación de riesgos a realizar no sea satisfactoria"]},
      {pregunta:"¿Existe una politica para establecer la no interconexion con entidades de intermediacion financiera cuando su riesgo sea mayor al establecido por el consejo de su institucion",indice:10,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear políticas para establecer la interconexión a entidades de intermediación financiera cuando sus riesgos sean mayor al definido por el consejo u órgano societario", "Crear políticas para sancionar preventivamente a entidades de intermediación financiera cuando la evaluación de riesgos a realizar no sea satisfactoria", "Realizar evaluaciones de Riesgos a entidades de intermediación financiera periódicamente"]}

],[
{pregunta:"¿Su metodoloiga identifica las amenzas y vulnerabilidades tecnologicas?",indice:11,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Implemnetar metodologia para detectar amenazas", "Crear politicas para identificar de una forma correcta amenazas y vulnerabilidades", "Realizar evaluaciones para verificar que la metodologia cumpla con lo necesario. "]},
      {pregunta:" ¿Su metodologia calcula la probabilidad de riesgo de ocurrencia?",indice:12,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Implementar metodologia que calcule la probabildad de riesgos ", "Crear una plan de accion para el calculo adecuado de riesgos", "Realizar evaluaciones para idenfiticar la probabilidad de riesgos es correcta"]},
      {pregunta:"¿Su metodoliga calcula el posible impacto previsto a las operaciones del negocio para determinar el riesgo potencial?",indice:13,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Implementar metodologia para mantener monitoreado el riesgo?", "Crear politicas para determinar el riesgo", "Realizar evaluaciones para ver el cumpliemiento adecuado de las metodologias."]},
      {pregunta:"¿Su evaluacion comtempla la divulgacion no autorizada de información, la corrupcion accidental o deliberada, la manipulacion de la informacion y la disponibilidad de los entornos en cualquier momento?",indice:14,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas para evitar divulgacion de informacion no autorizada.", "Mantener en constante actualizacion las politicas de informaicon de la empresa", "Realizar evaluaciones para ver el cumpliemientos de las politicas de informacion."]},
      {pregunta:"¿Los reisgos son tratados comforme el enfoque aprobado por el comité funcional de seguridad cibernitica y de la información?",indice:15,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Implementar un tratamiento de la informacion.", "Crear politicas que sean aprobadas  ytengan sehura la infromacion", "Verificar el tratamiento de los riesgos de la seguridad de la informacion."]}

] ]


  constructor(config: NgbTabsetConfig,private router: Router,public bd: VariablesglobalesService) { 
    config.justify = 'center';
    config.type = 'pills';
  }


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
        this.articulos[key].subtotal,this.articulos[key].subpuntuacion,this.bd.usuariologin.id,date,this.articulos[key].numero).subscribe((data: Response)=>{
         
          for(let k in data){
            idart = data[k];
            }
              for(let x in this.preguntas[key]){
                this.bd.ingresoPregunta(this.preguntas[key][x].pregunta,this.articulos[key].numero,this.preguntas[key][x].currentRate,this.preguntas[key][x].progres,idart).subscribe((data: Response)=>{})
              }
                
      
        })

    }

    this.router.navigate(['/Titulodos/Capitulodos']);

    }
    
    
  ngOnInit() {
  }

}
