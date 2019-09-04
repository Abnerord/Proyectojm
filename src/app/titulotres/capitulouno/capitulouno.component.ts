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
articulos = [{articulo:"Artículo 49. Consejo Sectorial",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:"Se crea el consejo sectorial para la respuesta a incidentes de seguridad cibernética del sector financiero y estará integrado por:a.	El gobernador del banco central b.	El superintendente de bancos c.	El superintendente del mercado de valores d.	El contador del banco central e.	El subgerente de sistema e innovación tecnológica del banco central  f.	El presidente de la asociación de bancos comerciales la republica dominica  g.	El presidente de la liga de asociaciones de ahorros y prestamos dominicanos h.	El presidente de asociación de bancos de ahorro y créditos i.	El director del equipo de respuesta a incidentes de seguridad cibernética",vermas:"Ver mas..",recomendaciones:"",numero:49},
            {articulo:"Artículo 50.Facultades",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"a.	Definir las prioridades y lineamientos para la coordinación del equipo de respuesta e incidentes  b.	Dar seguimiento a las actividades del equipo de respuesta  c.	Coordinar los esfuerzos de cooperación entre las entidades de intermediación financiera, los administradores y participantes d.	Definir el marco de cooperación y comunicación del equipo de respuesta a incidentes de seguridad cibernética e.	Definir el marco de cooperación y comunicación f.	Definir los protocolos de comunicaciones hacia los demás sectores económicos",vermas:"Ver mas..",recomendaciones:"",numero:50},
            {articulo:"Artiículo 51. Funcionamiento",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" El consejo sectorial deberá reunirse de manera ordinaria previa convocatoria de su presidente. Se deben presentar por lo menos una vez por trimestre.",vermas:"Ver mas..",recomendaciones:"",numero:51}];

//preguntas es el array que guarda las preguntas de cada articulo
//es importante resaltar que los segmentos de preguntas deben ir en el orden en el que se ingresaron los articulos en la variable articulos.
//si en la variable articulos en primer lugar esta un articulo, se debe de poner en primer lugar sus preguntas en el array preguntas.
//en este array no se debe modificar nada, mas que las variables pregunta, indice, y recomendaciones.
//pregunta guarda la pregunta del articulo, indice guarda el numero que le corresponde a esa pregunta,validacion es la varibale encargada de habilitar el uso del barrating
//color es la variable encargada de guardar el color que le corresponde a esa pregunta segun su puntuacion de madurez.
//progres calcula el porcentaje de la barra de progreso.
//currenRate guarda el nivel de madurez de la pregunta.
//recomendaciones, guarda las tres recomendaciones de cada pregunta. 
preguntas = [[{pregunta :"¿los miebros estan del consejo estan segementadas?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["segmentar el consejo según necesidades de la empresa.", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta:"¿existe un miembro de voz y voto?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["asignar un miembro con voz y voto en cada consejo.", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta:"¿existe un gobernador de bancos?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["elegir el gobernador acorde su experiencia y capacidad de bancos.", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta:"¿existe un superintendente de bancos?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["elegir el gobernador acorde su experiencia y capacidad de bancos.", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta :"¿existe un superintendente de mercado de valores?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["elegir el superintendente de valores.", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta:"¿existe el controlador del banco central?",indice:6,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["asignar el controlador de banco ", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta:"¿el subgerente  de sistemas  e innovación  Tecnológica  del banco central?",indice:7,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear un departamento de control a esta área.", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta:"¿el presidente de asociación de bancos.?",indice:8,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["asignar un presidente que representa en la asociación.", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta:"¿ El presidente de la Liga de Asociaciones de Ahorros y Préstamos Dominicana?",indice:9,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["asignar un presidente de asociaciones de ahorro y préstamos.", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta:"¿El presidente de la Asociación de Bancos de Ahorro y Crédito y Corporaciones  de Crédito?",indice:10,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["asignar un presidente de asociaciones de ahorro y créditos", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]},
              {pregunta:"¿ El director del Equipo de Respuesta a Incidentes de Seguridad Cibernética?",indice:11,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["asignar un director para estos incidentes.", "asignación de responsabilidades y roles a cada consejo.", "capacitación constante."]}
                  ],[
              {pregunta:"¿definicion las prioridades y lineamientos de CSIRT?",indice:12,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear un plan estratégico para definir los lineamientos de riesgos", "mejora y revisión constante de nuevas amenazas", "capacitación constante."]},
                    {pregunta:" ¿Seguimiento al CSIRT entorno a sus actividades y funcionamientos?",indice:13,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["realizar una evaluación en el marco de actividades y sus funcionamientos", "aplicar estándares para el manejo de incidentes.", "capacitación constante."]},
                    {pregunta:"¿coordinación de esfuerzos entre entes financieros y CSIRT?",indice:14,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear un consejo para regular la comunicación entres estas entidades", "crear un plan de coordinación entre las entidades para el manejo de riesgos e incidentes", "capacitación constante."]},
                    {pregunta:"¿Marco de comuniacion entre la CSIRT Y SIPARD?",indice:15,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear un consejo para regular la comunicación entres estas entidades", "crear un plan de coordinación entre las entidades para el manejo de riesgos e incidentes", "capacitación constante."]},
                    {pregunta:"¿Marco de cooperacion y comunicación  con entes externos definidas por la ley?",indice:16,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["adherirse a las regulaciones del país.", "crear una entidad que regule las acciones entorno a las regulaciones del país.", "capacitación y concientización a los usuarios."]},
                    {pregunta:"¿protocolos de comunicación con los demas sectores economicos y sociales de la republica de Guatemala.?",indice:17,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear una estrategia para la comunicación segura entre los sectores", "capacitación a los usuarios.", "mejora continua a nuevas metodologías de comunicación"]}
              
            ],[
              {pregunta:"¿el consejo se reune de manera ordinaria y una vez a cada trimestre, por lo minimo y responde a el presidente, solicitud de reuniones imprevistas?",indice:18,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["crear una política donde se responda a reuniones.", "adherirse a toda entidad a la política."," "]}
              
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

      this.router.navigate(['/Titulotres/Capitulodos']);

      }
  ngOnInit() {
  }

}
