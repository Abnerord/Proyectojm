import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import {VariablesglobalesService} from '../../variablesglobales.service';
import {Router} from '@angular/router';



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
  fecha = {year:0,month:0,day:0};
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
  articulos = [{articulo:"Articulo 6. Marco de Trabajo",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:" las entidades de intermediación financiera, administradores y participantes del SIPARD, entidades públicas de intermediación financiera y las entidades de apoyo y servicios conexos, deben establecer acciones para el desarrollo, implementación y mantenimiento del programa de seguridad cibernética y de la información.",vermas:"Ver mas..",recomendaciones:"", numero:6},
                {articulo:"Articulo 7. Estructura",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"las entidades de intermediación financiera, administradores y participantes, deben contar con una estructura gerencial y funciones de control de seguridad cibernética y de la información, acordes a su naturaleza, tamaño, complejidad, perfil de riesgo e importancia sistémica.",vermas:"Ver mas..",recomendaciones:"",numero:7},
                {articulo:"Articulo 8.  Aprobación del programa de Seguridad Cibernetica y de la Información",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:"",numero:8},
                {articulo:"Articulo 9.  Responsabilidades del Comite Funcional de Seguridad Cibernetica y de la Información",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" a.	Debe diseñar los lineamientos funcionales y el mantenimiento del programa de seguridad cibernética y de la información b.	Someter al consejo su aprobación de las políticas c.	Evaluar la efectividad del programa d.	Ratificar las decisiones de tratamiento de riesgos. e.	Comunicar al consejo los resultados de sus valoraciones sobre el reglamento.",vermas:"Ver mas..",recomendaciones:"",numero:9},
                {articulo:"Articulo 10.  Oficial de  Seguridad Cibernetica y de la informacion",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:"  El personal asignado a este rol debe contar con las competencias y capacidad requerida para la implementación del programa descrita en el reglamento.",vermas:"Ver mas..",recomendaciones:"",numero:10},
                {articulo:"Articulo 11.  Responsabilidades del oficial de seguridad cibernetica y de la información",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" a.	Desarrollar, implementar y mantener actualizado el programab.	Implementar políticas, estándares y procedimientos c.	Asignar responsabilidades d.	Gestionar las acciones para el tratamiento del riesgo tecnológico  e.	Cumplir con los limites de los niveles de riesgos establecidos f.	Definir y evaluar las responsabilidades de los proveedores",vermas:"Ver mas..",recomendaciones:"",numero:11},
                {articulo:"Articulo 12.  Areas Especializadas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Las áreas deben contar con una o varias áreas especializadas operativas y funcionales, responsables de la ejecución del programa de seguridad.",vermas:"Ver mas..",recomendaciones:"",numero:12}];
 
//preguntas es el array que guarda las preguntas de cada articulo
//es importante resaltar que los segmentos de preguntas deben ir en el orden en el que se ingresaron los articulos en la variable articulos.
//si en la variable articulos en primer lugar esta un articulo, se debe de poner en primer lugar sus preguntas en el array preguntas.
//en este array no se debe modificar nada, mas que las variables pregunta, indice, y recomendaciones.
//pregunta guarda la pregunta del articulo, indice guarda el numero que le corresponde a esa pregunta,validacion es la varibale encargada de habilitar el uso del barrating
//color es la variable encargada de guardar el color que le corresponde a esa pregunta segun su puntuacion de madurez.
//progres calcula el porcentaje de la barra de progreso.
//currenRate guarda el nivel de madurez de la pregunta.
//recomendaciones, guarda las tres recomendaciones de cada pregunta. 
preguntas = [[{pregunta :"¿Se mide el desempeño de las Tecnologias de la Informacion para detectar los problemas antes de que sea demasiado tarde?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Utilice un marco de referencia para realizar un programa de seguridad cibernética Ejemplo: Cobit 5", "Elabore un conjunto de mejores prácticas para en la seguridad de la Información, Medir el desempeño de las TI.", "Organice la Tecnologías de la información conforme a los objetivos de la organización "]},
{pregunta:"¿Se miden y reportan los riesgos, el control, el cumplimiento y el desempeño?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realice un análisis de Gestión de riesgos", "Realice una Inventario para la identificación de activos informáticos", "Realice una matriz de riesgos, para evaluar la probabilidad de ocurrencia y el impacto"]},
{pregunta:"¿Se miden y reportan los riesgos, el control, el cumplimiento y el desempeño?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realice una matriz de riesgos, para evaluar la probabilidad de ocurrencia y el impacto ", "Realice un plan de control de riesgos, valoración para aceptar, mitigar, transferir o evitar la ocurrencia del riesgo", "Monitoreo de la eficiencia y eficacia de las medidas de seguridad"]},
{pregunta:"¿Se realiza una revision de efectividad de los controles existentes como minimo una vez al año?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer una política, para la evaluación de controles existentes una vez al año, ", "establecer normas y prácticas para el cumplimiento del programa de seguridad cibernética", "Realizar un procedimiento para la medición de controles para el programa de seguridad cibernética "]}
    ],[
{pregunta:"¿Existe una politica para establecer una unidad funicional de seguridad cibernetica y de la informacion y sus respectivas areas especializadas?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una politica para establecer dentro del comite una unidad funcional de seguridad cibernetica", "Establecer los procedimientos o practicas y responsabilidades de la unidad funcional de seguridad cibernetica", "Supervisar periodicamente las responsabilidades de la unidad funcional "]},
      {pregunta:" ¿Existen politicas para establecer un ente encargado de esta Unidad de seguridad de seguridad cibernetica y de la informacion?",indice:6,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política para asignar un encargado de la unidad funcional de seguridad cibernética", "establecer que este cargo será ocupado por un alto ejecutivo designado por el consejo u órgano societario", "Establecer en la política los roles del encargado de la unidad funcional de seguridad cibernética"]},
      {pregunta:"¿Se realiza una supervicion periodica por parte del consejo u organo societario hacia esta estructura de seguridad Cibernetica?",indice:7,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer un plan de supervisión periódica para la evaluación de la estructura de seguridad cibernética por parte del consejo u órgano societario", "crear los lineamientos de los puntos críticos a supervisar por parte del órgano societario o consejo", "Agendar los días y horarios de la supervisión a realizar por parte del consejo u órgano societario"]},
      {pregunta:"¿Existe un procedimiento para verficiar la independencia de esta estructura sobre las areas de tecnologias de la información, negocio y operaciones.?",indice:8,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer en el reglamento institucional, la independencia de la estructura de seguridad cibernética en toma de decisiones, hacia cualquier otro departamento.", "Establecer los límites de decisiones que pueda tomar la estructura de seguridad cibernética, respecto al comité u órgano societario", "realizar evaluación del estado actual de la estructura del comité funcional de seguridad cibernética respecto a otras áreas"]},
      {pregunta:"¿Al no existir un comité funcional  ¿existe un comité de gestion de riesgos u otro que se encargue de estas funciones? Como un plan B para la de continuidad de negocios?",indice:9,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer en el reglamento institucional que otro comité relacionado a la seguridad cibernética, tiene que tomar el cargo del comité funcional de seguridad cibernética", "Establecer en el reglamento institucional la creación de un comité de gestión de riesgos", "Establecer los roles y responsabilidades que el comité interino tendrá a su cargo al momento de no existir un comité funcional se seguridad cibernética"]}

],[
{pregunta:"¿Las Politicas del programa de seguridad Cibernetica y de la Informacion son sometidas para su aprobación al consejo u organo societario?",indice:10,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer en el Reglamento institucional que, todo desarrollo e implementación de una nueva política, debe ser sometido a aprobación por el consejo u órgano societario", "Crear una política que establezca la implementación de nuevas políticas del programa de seguridad cibernética.", "Crear un procedimiento para el desarrollo de políticas para el programa de seguridad cibernética"]},
      {pregunta:" ¿El comité funcional es el encargado del desarrollo del programa de seguridad?",indice:11,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer los roles y responsabilidades del Comité funcional del programa de seguridad cibernética", "Crear procedimientos para la asignación de responsabilidades y roles al comité funcional del programa de seguridad cibernética", "Crear controles para supervisar el nivel de madurez del comité funcional del programa de seguridad cibernética, respecto a responsabilidades y roles"]},
      {pregunta:"¿Existe un procedimiento para la aprobacion  de un nuevo reglamento?",indice:12,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un procedimiento para el desarrollo de políticas para el programa de seguridad cibernética", "crear un control para el cumplimiento de los procedimientos para aprobación de nuevos reglamentos", "monitorear los controles para el cumplimiento de procedimientos para aprobación de nuevos reglamentos"]},
      {pregunta:"¿Existe un procedimiento para verficiar la independencia de esta estructura sobre las areas de tecnologias de la información, negocio y operaciones.?",indice:13,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política que establezca el tiempo adecuado entre aprobación e implementación de un nuevo reglamento", "Establecer sanciones en la política si existe incumplimiento de tiempo, para la implementación de nuevo reglamento", "Crear un procedimiento para la aprobación e implementación de nuevo reglamentos"]},
      {pregunta:"¿Existe una sancion por usar reglamentos en post de su aprobación, para el comité funcional de Seguridad Cibernetica?",indice:14,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer sanciones en la política de nuevos reglamentos, si existiera incumplimiento de tiempo en su implementación.", "Establecer un procedimiento para la implementación de nuevos reglamentos", "Establecer controles para el cumplimiento de nuevos reglamentos"]}

],[
{pregunta:"¿Existe un procedimiento para diseñar los lineamientos funcionales de seguridad cibernetica y de la informacion?",indice:15,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer procedimientos para el desarrollo del programa de seguridad cibernética", "establecer un control para el desarrollo del programa de seguridad cibernética y sus lineamientos", "monitorear el cumplimiento de los controles para el desarrollo del programa de seguridad cibernética"]},
      {pregunta:"¿Existe un procedimiento para la aprobacion de politicas del programa de seguridad cibernetica y de  la informacion?",indice:16,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un procedimiento para el desarrollo de políticas para el programa de seguridad cibernética", "crear un control para el cumplimiento de los procedimientos para aprobación de nuevos reglamentos", "monitorear los controles para el cumplimiento de procedimientos para aprobación de nuevos reglamentos"]},
      {pregunta:"¿Existe un control para evaluar la efectividad del programa de seguridad cibernetica y de la información ?",indice:17,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear los controles para la evaluación de efectividad del programa de seguridad cibernética", "Monitorear el cumplimiento de controles para medir la efectividad del programa de seguridad cibernética", "Realizar documentación sobre el cumplimiento de los controles y el nivel de efectividad "]},
      {pregunta:"¿Existe un procedimiento para confirmar las desiciones para el tratamiento de riesgo propuestas por el oficial de seguridad cibernetica y de la informacion ?",indice:18,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política que defina que el comité funcional, ratificara las decisiones del tratamiento del riesgo, presentadas por el Oficial de seguridad cibernética", "Crear un procedimiento para el tratamiento de riesgos", "crear controles para la evaluación del tratamiento de riesgos"]},
      {pregunta:"¿Existe un procedimiento para comunicar al consejo u organo societario, resultados de las valoraciones del programa de seguridad cibernetica y de la informacion ?",indice:19,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer en el reglamento que, las valoraciones del programa de seguridad cibernética tienen que ser comunicadas al consejo u órgano societario", "Crear una política para establecer la comunicación entre el consejo u órgano societario y el comité funcional para la valoración del programa de seguridad", "Crear un procedimiento para la valoración del programa de seguridad cibernética"]},
      {pregunta:"¿Existe una politica que regule el cumplimiento de la comunicación entre la estructura del programa de seguridad y el consejo u organo societario?",indice:20,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política para establecer la comunicación entre el consejo u órgano societario y el comité funcional para la valoración del programa de seguridad", "Crear un procedimiento para la valoración del programa de seguridad cibernética", "Crear controles para el cumplimiento de la comunicación entre el consejo u órgano societario y el comité funcional para valoración del programa de seguridad"]}

],[
{pregunta:" ¿Existe un politica que establesca el perfil del oficial de la unidad funcional de seguridad cibernetica y de la información?",indice:21,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer una política del perfil del Oficial de la unidad funcional de seguridad cibernética", "crear procedimientos para evaluar aptitudes y destrezas, a los interesados en este cargo", "establecer controles para el cumplimiento de los requisitos del perfil del oficial de la unidad funcional de seguridad cibernética"]},
      {pregunta:" ¿Existe un control de las aptitudes con las que debe contar el perfil del oficial de seguridad cibernetica y de la información?",indice:22,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer controles para el cumplimiento de los requisitos del perfil del oficial de la unidad funcional de seguridad cibernética", "monitorear el cumplimiento de los requisitos con los que debe cumplir el oficial de la unidad funcional", "monitorear el cumplimiento de los requisitos con los que debe cumplir el oficial de la unidad funcional"]},
      {pregunta:"¿Existe una politica que establezca cuales son las responsabilidades del ofical encargado del programa de seguridad cibernetica y de la información ?",indice:23,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer en el reglamento institucional, cuáles son las responsabilidades del oficial de la unidad de seguridad cibernética", "Crear una política para establecer sanciones por incumplimiento de deberes del oficial de la unidad funcional de seguridad cibernética", "crear controles para la medición y evaluación de responsabilidades del oficial de seguridad cibernética"]},
      {pregunta:"¿Existen sanciones establecidas por el incumplimiento de deberes y responsabilidades hacia el oficial de seguridad cibernetica y de la información?",indice:24,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política para establecer sanciones por incumplimiento de deberes del oficial de la unidad funcional de seguridad cibernética", "crear controles para la medición y evaluación de responsabilidades del oficial de seguridad cibernética", "evaluar periódicamente el cumplimiento de responsabilidades del oficial de la unidad funcional de seguridad cibernética"]},
      {pregunta:"¿Se tiene establecido que el oficial de seguridad cibernetica y de la información sera miembro y secretario del comité funcional.?",indice:25,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer en el reglamento institucional, cuáles son las responsabilidades y roles del oficial de la unidad de seguridad cibernética", "crear controles para la medición y evaluación de responsabilidades del oficial de seguridad cibernética", "evaluar periódicamente el cumplimiento de responsabilidades del oficial de la unidad funcional de seguridad cibernética"]},
      {pregunta:" ¿Existe un procedimiento para que el Oficial de seguridad cibernetica y de la informacion reporte periodicamente al CSIRT la situacion de la infraestructura tecnologica a su cargo.?",indice:26,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer una política para reportar periódicamente la situación de la infraestructura a CSIRT por parte del oficial de la unidad funcional", "Crear un procedimiento para reportar información al CSIRT sobre la situación de la infraestructura tecnológica", "Crear controles para supervisar la información enviada al CSIRT"]},
      {pregunta:"¿Existe una politica que establezca que otra persona pueda desempeñar el cargo de Ofical interino para cumplir obligaciones y responsabilidades de este cargo.?",indice:27,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política que establezca que el cargo de oficial de la unidad de seguridad cibernética puede ser desempeñado por otra persona, por corto plazo", "crear procedimientos para evaluar aptitudes y destrezas, a la persona asignada a este cargo provisionalmente", "crear controles para evaluar el cumplimiento de roles y responsabilidades del cargo de Oficial de la unidad de seguridad cibernética al oficial interino"]},
      {pregunta:"¿Existe un control de las aptitudes y requisitos que debe contar un ejecutivo para desempeñar el cargo de Oficial se seguridad cibernetica y de la informacion? ",indice:28,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear procedimientos para evaluar aptitudes y destrezas, a la persona asignada a este cargo provisionalmente", "crear controles para evaluar el cumplimiento de roles y responsabilidades del cargo de Oficial de la unidad de seguridad cibernética al oficial interino", "Monitorear constantemente la efectividad del Oficial interino respecto a los roles y responsabilidades del cargo"]}

],[
{pregunta:"¿Existen procedimientos de como se debe desarrollar un programa de seguridad cibernetica y de la informacion?",indice:29,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer procedimientos para el desarrollo del programa de seguridad cibernética y de la información ", "establecer controles para el desarrollo del programa de seguridad cibernética y sus lineamientos", "monitorear el cumplimiento de los controles para el desarrollo del programa de seguridad cibernética"]},
      {pregunta:" ¿Existen procedimientos para implentar, controlar y dar manteniminto a estos programas de seguridad cibernetica y de la información?",indice:30,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer procedimientos para la implementación, control y mantenimiento del programa de seguridad cibernética", "crear controles para verificar el cumplimiento de los procesos del programa de seguridad cibernética", "monitorear y realizar un feedback a los controles que sean necesarios para el cumplimiento del programa de seguridad cibernética"]},
      {pregunta:"¿Existen reglamentos que permitan implementar politicas, estandares y procedimientos para apoyar el programa de seguridad cibernetica y de la informacion?",indice:31,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer en el reglamento institucional el desarrollo de políticas, estándares, procedimientos, controles y mantenimientos para el programa de seguridad cibernética", "Definir en las políticas los objetivos y beneficios para la implementación de nuevos reglamentos, procedimientos y controles", "Realizar una evaluación de beneficios recibidos por la implementación de políticas, procedimientos y controles "]},
      {pregunta:"¿Existen politicas que establezcan el procedimiento para el tratamiento de riesgos?",indice:32,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer una política para el tratamiento de los riesgos", "crear procedimientos para realizar el tratamiento de riesgos adecuado mediante estándares internacionales", "crear controles para evaluar el tratamiento establecido a los riesgos de la organización "]},
      {pregunta:"¿existen politicas que indiquen los  niveles aceptados que permitan la gestion de riesgo?",indice:33,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política para establecer los niveles aceptados para la gestión de riesgo", "crear un procedimiento para la evaluación de los niveles aceptados para el tratamiento del riesgo", "Establecer un estándar internacional para valorar los niveles de riesgo "]}

],[
{pregunta:"¿Existen protocolos  para el personal tecnico encargada de estas areas especializadas?",indice:34,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer una política del perfil del personal para distintas áreas especializadas del comité funcional de seguridad cibernética", "crear procedimientos para medir el nivel de conocimiento en las áreas especializadas a aplicar por el personal técnico", "Evaluar las capacidades técnicas, del personal de cada área"]},
      {pregunta:" ¿Existe controles especializados para la gestion de recursos necesarios para garantizar la adecuada gestion del programa de seguridad cibernetica.?",indice:35,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una política que establezca que las entidades de intermediación y participantes del SIPARD deben contar con al menos un área funcional, responsable de la ejecución del programa de seguridad cibernética", "crear un procedimiento para establecer los pasos para el cumplimiento y ejecución del programa de seguridad cibernética por parte de entidades de intermediación", "Crear controles para evaluar el cumplimiento y ejecución del programa de seguridad cibernética "]},
      {pregunta:"¿Existe una politica que establezca que cada area especializada en el programa de seguridad cibernetica sea dirigida por un profesional nombrado por el Oficial de seguridad cibernetica?",indice:36,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear política para establecer que el Oficial de seguridad cibernética es el encargado de nombrar a un profesional encargado de cada área especializada", "crear procedimiento para verificar el perfil del encargado de cada área especializada ", "Crear controles para evaluar que el encargado de cada área cumpla con los roles y responsabilidades del cargo"]}

] ]
  
  constructor(config: NgbTabsetConfig,public bd: VariablesglobalesService,private router: Router) {// customize default values of tabsets used by this component tree
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

      this.router.navigate(['/Titulodos/Capitulouno']);

      }

  ngOnInit() {
  }
}
