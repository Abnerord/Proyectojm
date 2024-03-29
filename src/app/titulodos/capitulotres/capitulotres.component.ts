import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {VariablesglobalesService} from '../../variablesglobales.service';

@Component({
  selector: 'app-capitulotres',
  templateUrl: './capitulotres.component.html',
  styles: [],
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
articulos = [{articulo:"Articulo 41. Auditorías Internas",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:" Se deben establecer procesos de auditorias internas para garantizar la supervisión efectiva, se contempla lo siguiente:a.	Gestión de las auditorias internas de seguridad cibernética y de la información b.	Informes de resultados de las auditorias internas de seguridad cibernética y de la información",vermas:"Ver mas..",recomendaciones:"",numero:41},
            {articulo:"Articulo 42. Desempeño de la Seguridad",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"Se deben establecer un mecanismo que procuren asegurar un desempeño óptimo de la gestión de seguridad cibernética: a.	Monitoreo de la seguridad b.	Informes sobre la seguridad",vermas:"Ver mas..",recomendaciones:"",numero:42},
            {articulo:"Articulo 43. Cumplimiento del monitoreo de la Seguridad",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben establecer un procedimiento de gestión de cumplimiento de la seguridad cibernética y de la información derivados de los lineamientos reglamentarios, jurídicos y de obligaciones contractuales.",vermas:"Ver mas..",recomendaciones:"",numero:43}];

//preguntas es el array que guarda las preguntas de cada articulo
//es importante resaltar que los segmentos de preguntas deben ir en el orden en el que se ingresaron los articulos en la variable articulos.
//si en la variable articulos en primer lugar esta un articulo, se debe de poner en primer lugar sus preguntas en el array preguntas.
//en este array no se debe modificar nada, mas que las variables pregunta, indice, y recomendaciones.
//pregunta guarda la pregunta del articulo, indice guarda el numero que le corresponde a esa pregunta,validacion es la varibale encargada de habilitar el uso del barrating
//color es la variable encargada de guardar el color que le corresponde a esa pregunta segun su puntuacion de madurez.
//progres calcula el porcentaje de la barra de progreso.
//currenRate guarda el nivel de madurez de la pregunta.
//recomendaciones, guarda las tres recomendaciones de cada pregunta. 
preguntas = [[{pregunta :"¿Se realizan auditorías Periódicas?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realizar planes de implementación para auditorías", "Definir a cada cuanto tiempo se realizarán esta práctica", "Capacitar a usuarios para toma de buenas prácticas"]},
              {pregunta:"¿Se realiza auditorías Externas?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realizar planes periódicos para auditorías Externas", "Definir tiempos en que se realizará esta práctica", "Capacitar a usuarios para toma de buenas prácticas"]},
              {pregunta:"¿Se analiza que los auditores cuenten con certificaciones de la misma?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realizar planes de evaluación para determinar los servicios que prestará auditoría", "Analizar a los auditores por medio de evaluaciones", "Mantener relación con la auditoría que haya sido mejor calificada"]},
              {pregunta:"¿La auditoría es exhaustiva y Objetiva?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer planes de auditoría orientadas a la objetividad del negocio", "Establecer planes de auditoría objetivas y determinar alcances", "Notificar a alta Gerencia los resultados "]},
              {pregunta:"¿Se documentan y notifican a las partes interesadas sobre los resultados de la Auditoría?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer políticas de estructuración de documentos", "Implementar el modelo de documentos a presentar", "Notificar a colaboradores sobre modelo de documento"]}
                  ],[
              {pregunta:"¿Existen un CEO que monitoree el nivel de Seguridad Informática?",indice:6,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Definir el rol y perfil que debe contar un CEO", "Contratar al CEO conforme al perfil definido", "Establecer con CEO los roles y monitoreo de seguridad informática que necesita la corporación"]},
                    {pregunta:" ¿Se realiza de forma periódica un Etical Hacking?",indice:7,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer normas de buenas prácticas Búsqueda de corporaciones que ofrezcan el servicio", "Determinar los períodos que realizará ", "Contrato con empresa de servicio"]},
                    {pregunta:"¿El CEO realiza informes periódicos sobre el estado de vulnerabilidades encontradas en la infraestructura?",indice:8,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer informes con CEO para presentarlos Determinar modelos de informes", "Determinar los períodos que realizará los informes", "Divulgación de informes para establecer medidas de seguridad"]},
                    {pregunta:"¿Se realiza análisis de Seguridad de forma periódica en los sistemas e infraestructura?",indice:9,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Determinar planes estratégicos de análisis de sistemas bajo normas internacionales", "Aplicar las normas establecidas", "Divulgar información sobre las buenas prácticas de seguridad para ser evaluadas y determinas su madurez"]},
                    {pregunta:"¿El CEO presenta los estados de resultado sobre las posibles vulnerabilidades en la corporación?",indice:10,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Determinar formatos de estados de resultados bajo normas Internacionales", "Aplicar los formatos determinados ", "Divulgar información de cuáles serán los formatos que se utilizarán"]}
              
            ],[
              {pregunta:"¿Se cuenta con procesos de seguridad en las restrinjan los accesos?",indice:11,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer procesos de seguridad bajo las políticas de seguridad establecidas", "Corroborar que las políticas sean cumplidas", "Realizar actualizaciones de políticas de seguridad anualmente"]},
                    {pregunta:" ¿Existen un área de Seguridad que vele el cumplimiento de la seguridad cibernética?",indice:12,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer roles que ejercerá el hora de seguridad", "Realizar auditorías para corroborar que el área cumpla con las políticas establecidas", "El área debe realizar actualizaciones de las políticas de seguridad"]},
                    {pregunta:"¿Existen sanciones cuando no se cumplen con los estándares de seguridad?",indice:13,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer sanciones conforme el grado de la falta", "Realizar planes de concientización ", "Monitorear que los colaboradores cumplan con los estándares"]},
                    {pregunta:"¿El área de seguridad?",indice:14,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realizar manuales de seguridad bajo normas Internacionales Determinar procesos definidos para cada control", "Establecer manuales y políticas de seguridad ", "Capacitar a los Usuarios Divulgar las políticas de seguridad a toda la corporación"]},
                    {pregunta:"¿Se realiza análisis de seguridad periódicas para corroborar si las políticas establecidas deben cambiar o continuar?",indice:15,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer normas de buenas prácticas para determinar cuándo se actualizarán los manuales", "Actualizar los manuales conforme a la necesidad de la empresa", "Actualizar los manuales conforme lo establecido a buenas prácticas, debe estar firmadas y autorizadas por los Gerentes"]}
              
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

      this.router.navigate(['/Titulodos/Capitulocuatro']);

      }
  ngOnInit() {
  }

}
