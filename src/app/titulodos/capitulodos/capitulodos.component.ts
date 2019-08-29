import { Component, OnInit } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

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
 articulos = [{articulo:"Articulo 16. Politica de Seguridad Cibernetica y de la información",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:" las entidades de intermediación financiera, administradores y participantes del SIPARD, entidades públicas de intermediación financiera y las entidades de apoyo y servicios conexos, deben establecer acciones para el desarrollo, implementación y mantenimiento del programa de seguridad cibernética y de la información.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 17. Contratos con colaboradores.",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"las entidades de intermediación financiera, administradores y participantes, deben contar con una estructura gerencial y funciones de control de seguridad cibernética y de la información, acordes a su naturaleza, tamaño, complejidad, perfil de riesgo e importancia sistémica.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 18.Cultura de seguridad cibernética y de la inforamción?",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 19.Gestión de activos informaticos",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 20.Aplicacion de Negocio.",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 21. Politicas de privacidad de la información.",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 22.Terminos y condiciones de uso",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 23. Trazabilidad de la conexiones de los clientes",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 24.Gestion de Accesos de los colaboradores",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 25. Mecanismo de control de acceso",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 26. Gestion de sistemas de informacion ",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 27. Infraestructura tecnica de seguridad ",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 28. Gestion de la red",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 29. Conexiones con los servicios de ente reguladores y supervisores",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Artiuclo 30. Gestion de vulnerabilidades y amenazas tecnlogicas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 31. Gestion de incidentes de seguridad cibernetica y de la informacion ",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 32. Entornos locales de operación",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 33. Aplicaciones de estaciones de trabajo",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 34. Dispositivos de computacion Movil",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 35. Comunicaciones Electrónicas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 36. Gestión de Proveedores Externos de Producción o Servicios Tecnológicos",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 37. Gestión de Desarrollo de Sistemas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 38. Ciclo de Vida del Desarrollo de Sistemas y Aplicaciones",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 39. Seguridad Física y del Entorno",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""},
              {articulo:"Articulo 40. Continuidad de las Operaciones Tecnológicas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:""}];
              
 
//preguntas es el array que guarda las preguntas de cada articulo
//es importante resaltar que los segmentos de preguntas deben ir en el orden en el que se ingresaron los articulos en la variable articulos.
//si en la variable articulos en primer lugar esta un articulo, se debe de poner en primer lugar sus preguntas en el array preguntas.
//en este array no se debe modificar nada, mas que las variables pregunta, indice, y recomendaciones.
//pregunta guarda la pregunta del articulo, indice guarda el numero que le corresponde a esa pregunta,validacion es la varibale encargada de habilitar el uso del barrating
//color es la variable encargada de guardar el color que le corresponde a esa pregunta segun su puntuacion de madurez.
//progres calcula el porcentaje de la barra de progreso.
//currenRate guarda el nivel de madurez de la pregunta.
//recomendaciones, guarda las tres recomendaciones de cada pregunta. 
 preguntas = [[{pregunta :"¿Sus politicas contemplan procesos de la gestion de la seguridad cibernetica y de la información?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1.1","hola2.1","hola3.1"]},
                {pregunta:"¿Sus politicas contemplan procedimientos de la gestion de la seguridad cibernetica y de la información?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1.2","hola2.2","hola3.2"]},
                {pregunta:"¿Poseen un plan de evaluación continua para mantener y monitorear el cumplimiento de las politas de la gestion de la seguridad ciberneticas y de la información?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                {pregunta:"¿Sus colaboradores conocen las politicas de la gestion de la seguridad cibernetica y de la información que se maneja?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                {pregunta:"¿Utiliza diferentes medios de comunicación (pizarras informativas, boletines, panfletos, email, conferencias, capacitaciones) para dar a conocer sus politicas de la gestion de la seguridad cibernetica y de la informacion?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                    ],[
                {pregunta:"¿Tiene un documento formal que establezca la responsabilidades generales y especificas de seguridad cibernética y de la informacion, si el inciso no esta contemplando en el contrato con el colaborador ?",indice:6,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Las responsabilidades generales y especificas de seguridad cibernética y de la información estan detalladas con claridad en el contrato y los colaboradores lo entienden?",indice:7,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Las responsabilidades generales y especificas de seguridad cibernética y de la información estan establecidad para cada entidad que operan en la empresa?",indice:8,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Las responsabiliades generales y especificas de seguridad cibernética y de la información son evaluadas periodicamente para su actualización?",indice:9,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿En su empresa se promueve una cultura de seguridad cibernética y de la información?",indice:10,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Poseen programas continuos de sensibilización sobre el rol de los colaboradores en la seguridad cibernética y de la información?",indice:11,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Sus colaboradores tienen conocimiento del uso correcto de los sistemas de información e infraestrucutra tecnológica?",indice:12,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Tienen programas continuos de capacitacion técnica dirigidos a los colaboradores responsables de la seguridad cibernética y de la información?",indice:13,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Tienen la provision de los recursos adecuados para apoyar la efectividad de los programas continuos de sensibilización de seguridad cibernética y de la información?",indice:14,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Poseé un esquema de gestión de activos información?",indice:15,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Tiene una clasificación de activos de información que se lleva acabo de acuerdo con el nivel de confidecnialidad y sensibilidad de la información?",indice:16,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Sus documentos son manejados de forma sistematica y estructurada?",indice:17,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿La información sensible en formato fisico esta protegida contra corrupción, pérdida o divulgación no autorizada?",indice:18,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Los sistemas informaticos y equipos de la infraestructura tenológica estan registrados en un repositorio?",indice:19,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:" ¿Utiliza funcionalidades de seguridad de la información alineadas a la infraestrucutra técnica de seguridad?",indice:20,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Las funcionalidades de seguridad de la información cumplen con la confidencialidad, integridad y disponibilidad de la información?",indice:21,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Sus controles de aplicaciones y servicios transaccionales son internos como externos ?",indice:22,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Sus controles contemplan los servicios hacia internet, basados en el navegador y en los servidores en donde se ejecutan?",indice:23,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Sus controles de seguridad protegen la confidencialidad e integridad de la información, cuando es ingresada, procesada o extraida de la aplicación?",indice:24,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Los contratos con los clientes tienen especificadas las politicas relacionadas a la privacidad de la información?",indice:25,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Las politicas de privacidad contemplan datos de carácter personal utilizados en sus productos y servicios?",indice:26,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Las politicas de privacidad contemplan las modificaciones a los datos de carácter personal, de prodcutos o servicios?",indice:27,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Las politicas de privacidad contienen el desglose del uso que la entidad receptora de información dará a cada tipo de información?",indice:28,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Las politicas de privacidad contienen la recopilación de datos y su divulgación a través de medios fisicos o electrónicos?",indice:29,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Actulizan sus terminos de uso?",indice:30,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Los terminos de uso y condiciones cubren los aspectos de seguridad cibernética y de la información?",indice:31,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Gestion los terminos y condiones de uso?",indice:32,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Su plan de gestion de terminos y condiciones de uso esta en conformidad con la seguridad cibernética y de la información?",indice:33,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Existe un inventario de conexiones ?",indice:34,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Se registran los accesos de los clientes a los servicios de canales electrónicos?",indice:35,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se registran los accesos de los clientes a los servicios de canales digitales?",indice:36,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Los accesos de los clientes estan protegidos mediante mecanismos de control y supervisión?",indice:37,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Dentro de su programa de seguridad cibernética y de la información existe la gestion de los accesos de los colaboradores a los sistemas de información e infraestructura tecnólogicas?",indice:38,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿existen limites y controles para los accesos de los colaboradores a los sistemas de información e infraestructura tecnológica?",indice:39,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Los controles de accesos a los colaboradores sobre los sistemas de información e infraestructura tecnólogica son previamente autorizados?",indice:40,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Evaluan el perfil del colaborador antes de otorgarla autorización a los accesos de los sistemas informaticos e infraestructura?",indice:41,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Su metodoloiga identifica los roles y privilegios de accesos?",indice:42,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Su metodologia proporciona una adecuada matriz de riesgos?",indice:43,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Su metodologia utiliza mecanismos apropidos de control de accesos en las politicas internas?",indice:44,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿ Tiene previsto los principios de menor privilegio y menor funciones?",indice:45,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Sus politicas contemplan procesos de la gestion de la seguridad  de la información e infraestrucutra tecnologica?",indice:46,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Poseen un plan de evaluación continua para mantener y monitorear el cumplimiento de las politas de la gestion de la seguridad  de la información e infraestructura tecnologica?",indice:47,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Sus colaboradores conocen las politicas de la gestion de la seguridad de la información que se maneja?",indice:48,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se realiza un adecuado copias de resguardo y almacenados en un lugar seguro?",indice:49,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿ Se cuenta con un comité de seguridad cibernetica y de la arquitectura tecnologica?",indice:50,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Se cuenta con un proceso de administracion de perfiles de usuario?",indice:51,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se cuenta con politicas integrales de seguridad cibernetica y de la informacion?",indice:52,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se cuenta con las adecuadas soluciones criptograficas?",indice:53,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿ Se cuenta con una adecuada implementacion de procesos  y plataformas para la gestion segura de red?",indice:54,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Se cuenta configurado de forma adecuada los dispositivos de red?",indice:55,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se cuenta con los adecuados controles fisicos de red?",indice:56,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se cuenta con los adecuados controles externos de red y sistemas informaticos?",indice:57,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿ Cuenta con controles de mantenimiento remoto y acceso inalambrico?",indice:58,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Se cuenta con un reglamento de conexiones a los sistemas de informacion?",indice:59,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Posee adecuada implementacion para garantizar la disponibilidad de los servicios?",indice:60,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿ Se cuenta con procesos adecuados de analisis, monitoreo y apoyo de evaluaciones integrales de vulnerabilidades?",indice:61,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Las funcionalidades de seguridad de la información cumplen con la confidencialidad, integridad y disponibilidad de la información?",indice:62,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿ Se cuenta con una adecuada actualizacion de los sitemas de informacion?",indice:63,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿ Se cuenta con estrategias de inteligencia contra amenazas de informacion?",indice:64,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se cuenta con los servicios adecuados para las vulnerabildiades y amenazas tecnologicas?",indice:65,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Se cuenta con medidas contra ataques e incidentes de seguridad de la informacion?",indice:66,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Se cuenta con metodos eficaz para correctivos de emergencias?",indice:67,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se cuenta con procesos de investigacion forense?",indice:68,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                      
                
              ],[
                {pregunta:"¿Cuenta con perfiles de seguridad de localidad fisica?",indice:69,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿ Se cuenta con las medidas para coordinar actividades de seguridad?",indice:70,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Existe un inventario de aplicaciones en el area de trabajo?",indice:71,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Se cuenta con la adecuada proteccion de archivos?",indice:72,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se cuenta con la adecuada protecion de la base de datos?",indice:73,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Existe metodos de segridad para acceso remotos a los dispositivos de la estacion de trabajo?",indice:74,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Se cuenta con la gestion centralizada de dispositivos moviles?",indice:75,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Cuenta con controles de dominios internos y Externos en su corporación?",indice:76,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿La mensajería Instantánea está aplicada únicamente a puestos claves?",indice:77,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Las plataformas que se utiliza en la corporación, cuentan con configuraciones que van acorde al puesto que tiene el usuario?",indice:78,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Los servicios de teléfonos corporativos se encuentran restringidos para hacer llamadas externas?",indice:79,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Las llamadas externas se otorga acceso a puestos claves?",indice:80,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Antes de contratar un tercerizador, se analiza cuáles son las necesidades que deberá cubrir?",indice:81,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Se realiza contratos de SLA’s con los proveedores?",indice:82,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se comprueba que el proveedor cumpla con alguna norma ISO relacionado a la Ciberseguridad?",indice:83,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se investiga como mínimo tres proveedores antes de adquirir un servicio o equipo?",indice:84,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se realiza un análisis sobre qué proveedor cumplirá con las necesidades que necesite la corporación?",indice:85,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Existe segmentación antes de desarrollar un sistema?",indice:86,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Cuentan con políticas de Seguridad entre las áreas de TI?",indice:87,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿El área de Sistemas cuenta con pruebas de QA antes de ser publicado?",indice:88,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Los sistemas desarrollados cuentan con una capa de Seguridad?",indice:89,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿los centros de datos cuentan con equipos contra incendios adecuados a su entorno?",indice:90,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Durante la toma de requerimientos, se contempla el nivel de seguridad que se aplicará al sistema?",indice:91,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se aplica la práctica del ciclo de Vida de un Sistema?",indice:92,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Los sistemas cuentan con codificación y personalización de paquetes?",indice:93,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿El sistema desarrollado pasa por pruebas de Etical Haking?",indice:94,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Se realiza seguimiento a los Sistemas una vez instalados?",indice:95,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Los servidores cuentan con protección contra desastres naturales?",indice:96,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿El centro de datos se encuentra restringido ante accesos físicos no autorizados?",indice:97,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿El centro de datos cuenta con avisos de salidas de emergencia?",indice:98,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿La infraestructura cuenta con una planta eléctrica?",indice:99,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿La infraestructura cuenta con protección de Para-rayos?",indice:100,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ],[
                {pregunta:"¿Se realiza un análisis de riesgo cuando existe una caída de procesos?",indice:101,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:" ¿Se realiza una prueba de estrés relacionado a la continuidad de las operaciones tecnológicas?",indice:102,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿Existe un manual donde defina los roles que debe realizar cada equipo ante la incidencia de ataque de Ciber Seguridad?",indice:103,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]},
                      {pregunta:"¿¿Existen documentos con planes de recuperación ante desastres tecnológicos??",indice:104,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["hola1","hola2","hola3"]}
                
              ] ]

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
