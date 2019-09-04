import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {VariablesglobalesService} from '../../variablesglobales.service';

@Component({
  selector: 'app-capitulodos',
  templateUrl: './capitulodos.component.html',
  styles: [],
  providers: [  NgbTabsetConfig    ]
})
export class CapitulodosComponent implements OnInit {
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
articulos = [{articulo:"Artículo 52. Creación del mecanismo",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:"Se crea el equipo de respuesta a incidentes de seguridad cibernética, con la finalidad de definir acciones inmediatas para la prevención, detección, contención, erradicación y recuperación frente a incidentes de seguridad.",vermas:"Ver mas..",recomendaciones:"",numero:52},
            {articulo:"Artículo 53.Responsabilidades",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"El equipo de respuesta a incidentes debe cumplir con los deberes y responsabilidades que le sean otorgados por el consejo sectorial.",vermas:"Ver mas..",recomendaciones:"",numero:53},
            {articulo:"Artículo 54. Estrucutura",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se debe contar con una estructura orgánica que facilite el cumplimiento de sus deberes y responsabilidades.",vermas:"Ver mas..",recomendaciones:"",numero:54},
            {articulo:"Articulo 55. Dirección.",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" se debe estar dirigido por un profesional designado por el banco central, en virtud de sus competencias administrativas y capacidades requerida para la dirección de equipos de respuesta a esta naturaleza.",vermas:"Ver mas..",recomendaciones:"",numero:55},
            {articulo:"Articulo 56. Instalaciones",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:"se debe operar en un lugar aislado y seguro. Asimismo, se debe contar con controles de seguridad física y lógicos de manera permanente.",vermas:"Ver mas..",recomendaciones:"",numero:56},
            {articulo:"Articulo 57. Definición de Politicas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:"Se debe contar con políticas que deben ser seguidas por su personal en la realización de sus operaciones acorde a los lineamientos definidos por este reglamento.",vermas:"Ver mas..",recomendaciones:"",numero:57},
            {articulo:"Articulo 58. Establecimiento de los Servicios",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:"se debe establecer servicios de seguridad cibernética, a fin de dar apoyo a las entidades de intermediación financiera, los administradores y participantes.",vermas:"Ver mas..",recomendaciones:"",numero:58}];

//preguntas es el array que guarda las preguntas de cada articulo
//es importante resaltar que los segmentos de preguntas deben ir en el orden en el que se ingresaron los articulos en la variable articulos.
//si en la variable articulos en primer lugar esta un articulo, se debe de poner en primer lugar sus preguntas en el array preguntas.
//en este array no se debe modificar nada, mas que las variables pregunta, indice, y recomendaciones.
//pregunta guarda la pregunta del articulo, indice guarda el numero que le corresponde a esa pregunta,validacion es la varibale encargada de habilitar el uso del barrating
//color es la variable encargada de guardar el color que le corresponde a esa pregunta segun su puntuacion de madurez.
//progres calcula el porcentaje de la barra de progreso.
//currenRate guarda el nivel de madurez de la pregunta.
//recomendaciones, guarda las tres recomendaciones de cada pregunta. 
preguntas = [[{pregunta :"¿El sector finnaciero bajo de dependencia del banco central crea un equipo de CSRIT?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear el presupuesto y modalidades de ejecución de este", "adherirse a las regulaciones según la junta monetaria. ", "capacitación constante."]},
              {pregunta:"¿Las acciones (prevención,Detección,Contención,Erradicación y recuperación)estan definidas ante las emergencias?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear el plan y adherirlo a la CSIRT", "Realizar correcciones y mejora continua ante nuevos incidentes", "adherir nuevos conocimientos para el plan estratégico a manejo de incidentes"]},
              ],[
              {pregunta:"¿las acciones de una CSIRT cumplen ante cualquier riesgo?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["adaptar la acción de la CSRIT a la entidad de la empresa", "plan estratégico de CONTINUIDAD DEL NEGOCIO Y RECUPERACION", "buenas prácticas y mejoras continuas mediante capacitación constante."]},
               ],[
              {pregunta:"¿El equipo de CSRIT esta definido mediante una estrucutura.?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["adherir a una estructura organizada a el CSIRT", "asignación de responsabilidades a los encargados de control de la CSRIT.", "capacitación y concientización a los responsables."]},
                    {pregunta:" ¿la estrucutura cuple con los requerimientos de facilitar los deberes y responsabilidades?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear una política donde se debe establecer los deberes y responsabilidades", "asignación de roles y responsabilidades de cada entidad.", "capacitación y concientización a los responsables."]},
              ],[
              {pregunta:"¿Verificar si la persona designado por banco central es un profesional competente.?",indice:6,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["asignar a personal que cumpla con los requisitos. ", "capacitación del personal.", "realizar pruebas y verificar el desempeño adecuado"]},
                    {pregunta:"¿Verificar si el profesional asignado esta autorizado por el Banco Central?",indice:7,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["asignar a personal que cumpla con los requisitos. ", "capacitación del personal.", "realizar pruebas y verificar el desempeño adecuado"]},
                 ],[
              {pregunta:" ¿Verificar que CSIRT operará en un lugar aislado y asegudado?",indice:8,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Contactar a los responsables en caso de que CSIRT no tenga un lugar donde operar, tomando como requisito principal: debe ser aislado para poder trabajar y que este principalmente asegurado.", "Verificar el sitio donde operara CSIRT sea un lugar completamente aislado para que no sea interrumpidas las operaciones y sea seguro.", "Verificar el sitio donde operara CSIRT se encuentre en óptimas condiciones."]},
                    {pregunta:" ¿Verificar que CSIRT tiene implementada la infraestructura tecnologica y sistemas de información?",indice:9,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Contactar a los responsables en caso de que CSIRT no tenga la infraestructura tecnológica que necesita para poder operar y no cuente con los sistemas de información necesarios.", "Verificar que la infraestructura donde operara CSIRT cumpla con los requisitos necesarios para operar de forma óptima.", "Verificar que la infraestructura cuente con mantenimiento para un uso óptimo."]},
                    {pregunta:"¿Verficiar la información sensible fue recibida y almacenda dentro del sistema de información?",indice:10,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Contactar con el equipo de trabajo en caso de que la información sensible no fue enviada y por tanto no se encuentre almacenada en los sistemas de información.", "Contactar con el equipo de trabajo en caso de que la información haya sido alterada y se encuentre con errores de lectura.", "Verificar que la información se encuentre integra y esté disponible en cualquier momento."]},
                    {pregunta:"¿Verficiar si las instalaciones de los equipos cuentan con acceso restringido y aislado?",indice:11,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["En caso de que el sitio no cuente con un sistema de acceso al sitio de trabajo, deberá adquirir uno para garantizar que el sitio se encuentre seguro.", "Notificar inmediatamente si el sistema de acceso al sitio de trabajo presenta irregularidades en su funcionamiento.", "Verificar que la seguridad del sitio de trabajo cuente con mantenimiento para un uso óptimo."]},
                    {pregunta:"¿Verificar que el centro de datos este autorizado por el Consejo Sectorial?",indice:12,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["No realizar ninguna operación en caso de que el consejo sectorial no haya dado aprobado el sitio de trabajo para su uso.", "Realizar los trámites necesarios para que el consejo sectorial apruebe el sitio de trabajo.", "Mantener el centro de datos en óptimas condiciones."]},
                    {pregunta:" ¿Verificar que los servidores, equipos de comunicaciones y dispositivos de seguridad logica permanezcan dentro de las instalaciones del CSRT?",indice:13,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Notificar inmediatamente a los responsables, en caso de encontrar el equipo fuera de las instalaciones de CSRT y posteriormente verificar que los equipos no presenten anormalidades en su uso.", "Informar inmediatamente en caso de que los equipos no estén funcionando correctamente, dentro de las instalaciones de CSRT.", "Mantener un control sobre los equipos que se encuentren dentro de las instalaciones del CSRT."]},
                ],[
              {pregunta:"¿Verficiar que el personal realialice las operaciones acorde a los lineamientos del Consejo Sectorial?",indice:14,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Informar inmediatamente sobre el personal que este incumpliendo con los lineamientos establecidos, en caso de que sea algo recurrente solicitar personal nuevo que cumpla con lo establecido.", "Mantener al día al personal sobre cualquier cambio en los lineamientos.", "Ofrecer capacitaciones continuas sobre el acuerdo sectorial."]},
                    {pregunta:" ¿Verificar que el personal de seguimiento a las politicas?",indice:15,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Informar a los responsables sobre la inexistencia o del incumplimiento de las políticas.", "Dar capacitaciones sobre las políticas de la organización.", "Tener un control sobre el cumplimiento de las políticas actualizado."]},
                    ],[
              {pregunta:"¿Validar que el CSIRT haya establecido el servicio de seguridad cibernetica?",indice:16,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Notificar a los responsables sobre la inexistencia de los servicios establecidos por la CSIRT.", "Validar que el servicio establecido de seguridad cibernética haya sido implementado dentro del CSIRT.", "Monitorear el servicio establecido."]},
                    {pregunta:" ¿Validar que las entidades publicas de intermediación financiera y de apoyo reciban ayuda en respuesta a los incidentes de eguridad cibernetica?",indice:17,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Notificar a los responsables en caso de ayuda inexistente sobre los incidentes ocurridos.", "Validar el cumplimiento de los procesos.", "Tener un historial sobre el número de veces que las entidades financieras recibieron apoyo."]},
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
          this.articulos[key].subtotal,this.articulos[key].subpuntuacion,this.bd.usuariologin.id,date,this.articulos[key].numero).subscribe((data: Response)=>{
           
            for(let k in data){
              idart = data[k];
              }
                for(let x in this.preguntas[key]){
                  this.bd.ingresoPregunta(this.preguntas[key][x].pregunta,this.articulos[key].numero,this.preguntas[key][x].currentRate,this.preguntas[key][x].progres,idart).subscribe((data: Response)=>{})
                }
                  
        
          })

      }

      this.router.navigate(['/Titulocuatro/Capitulouno']);

      }
  ngOnInit() {
  }

}
