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
  articulos = [{articulo:"Articulo 16. Politica de Seguridad Cibernetica y de la información",subtotal:0,subpuntuacion:0,color:"danger",madurez:0,colorm:"danger",descripcion:" Se deben implementar y mantener una política general o varias políticas segregadas que contemplen los aspectos, proceso y procedimientos para la gestión de seguridad.",vermas:"Ver mas..",recomendaciones:"",numero:16},
  {articulo:"Articulo 17. Contratos con colaboradores.",subtotal:0,subpuntuacion:0,color:"danger",progres:0,madurez:0,colorm:"danger",descripcion:"Se deben incorporar en los contratos con los colaboradores, las responsabilidades generales y específicas.",vermas:"Ver mas..",recomendaciones:"",numero:17},
  {articulo:"Articulo 18.Cultura de seguridad cibernética y de la inforamción?",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben promover una cultura de seguridad contemplando lo siguiente:a.	El establecimiento de programas continuos de sensibilización sobre el rol de los colaboradores.b.	La definición de las responsabilidades de los colaboradores relacionados con la seguridad cibernética.c.	La instauración de programas continuos de capacitación técnica dirigidos a los colaboradores.d.	La provisión de los recursos adecuados para apoyar la efectividad de los programas continuos de la seguridad.",vermas:"Ver mas..",recomendaciones:"",numero:18},
  {articulo:"Articulo 19.Gestión de activos informaticos",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" a.	Clasificación de activos de la informaciónb.	Gestión de documentosc.	Información sensible en formato físicod.	Registros de activos de información",vermas:"Ver mas..",recomendaciones:"",numero:19},
  {articulo:"Articulo 20.Aplicacion de Negocio.",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" a.	Protección de aplicacionesb.	Protección de las aplicaciones basadas en navegaciónc.	Validación de la información en las aplicaciones de negocio",vermas:"Ver mas..",recomendaciones:"",numero:20},
  {articulo:"Articulo 21. Politicas de privacidad de la información.",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben especificar en los contratos con sus clientes, las políticas relacionadas a la privacidad de la información y datos de carácter personal utilizados en sus productos y servicios, así como sus modificaciones.",vermas:"Ver mas..",recomendaciones:"",numero:21},
  {articulo:"Articulo 22.Terminos y condiciones de uso",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se debe mantener actualizados los términos y condiciones de uso previamente aprobados, cubriendo los aspectos de seguridad cibernética, y asimismo gestionar el cumplimiento de estos.",vermas:"Ver mas..",recomendaciones:"",numero:22},
  {articulo:"Articulo 23. Trazabilidad de la conexiones de los clientes",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Deben identificar y registrar en un inventario de conexiones, los accesos de los clientes a los servicios de canales electrónicos o digitales. Este acceso de los clientes debe ser protegido mediante mecanismos de control y supervisión.",vermas:"Ver mas..",recomendaciones:"",numero:23},
  {articulo:"Articulo 24.Gestion de Accesos de los colaboradores",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se debe tomar en cuenta los siguientes aspectos: a.	Control de accesos b.	Autorización a los colaboradores",vermas:"Ver mas..",recomendaciones:"",numero:24},
  {articulo:"Articulo 25. Mecanismo de control de acceso",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" El acceso a los sistemas de información e infraestructura tecnológica se limitará a las personas autorizadas, utilizando mecanismos apropiados de control de accesos.",vermas:"Ver mas..",recomendaciones:"",numero:25},
  {articulo:"Articulo 26. Gestion de sistemas de informacion ",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben establecer políticas y procedimientos para la gestión de servicios conexos, deben establecer políticas y procedimientos para la gestión de los sistemas de información.",vermas:"Ver mas..",recomendaciones:"",numero:26},
  {articulo:"Articulo 27. Infraestructura tecnica de seguridad ",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:"Se deben implementar plataformas y sistemas que faciliten aplicabilidad de los controles de seguridad apropiados.a.	Arquitectura de seguridad cibernética y de la información b.	Gestión de identidad c.	Sistemas de información de infraestructura criticas d.	Soluciones criptográficase.	Protección contra la fuga de información f.	Gestión de los derechos digitales",vermas:"Ver mas..",recomendaciones:"",numero:27},
  {articulo:"Articulo 28. Gestion de la red",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben implementar procesos y plataformas para la gestión segura de los componentes en las redes de información, tomando en cuenta lo siguiente: a.	Configuración de dispositivos de red b.	Gestión de la red física c.	Conexiones de redes externas d.	Trafico de datos a través de los firewalls e.	Mantenimiento remoto f.	Acceso a redes inalámbricas g.	Redes de voz sobre IP h.	Telefónica y conferencia",vermas:"Ver mas..",recomendaciones:"",numero:28},
  {articulo:"Articulo 29. Conexiones con los servicios de ente reguladores y supervisores",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" las políticas del programa deben ser sometida al consejo u órgano societario competente, para su aprobación por parte del comité funcional de seguridad cibernética a mas tardar entre el tercer y sexto mes de entrar en vigencia.",vermas:"Ver mas..",recomendaciones:"",numero:29},
  {articulo:"Artiuclo 30. Gestion de vulnerabilidades y amenazas tecnlogicas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben establecer un proceso de análisis, monitoreo y evaluación integral de las vulnerabilidades y amenazas tecnológicas.",vermas:"Ver mas..",recomendaciones:"",numero:30},
  {articulo:"Articulo 31. Gestion de incidentes de seguridad cibernetica y de la informacion ",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:"Se deben establecer políticas y procedimientos para la gestión de los incidentes de seguridad cibernética, con el fin de identificar, responder, remediar y documentar de manera efectiva los eventos de seguridad. a.	Medidas contra ataques cibernéticos e incidentes de la información de seguridad de la información  b.	Correctivos de emergencia c.	Investigaciones forenses ",vermas:"Ver mas..",recomendaciones:"",numero:31},
  {articulo:"Articulo 32. Entornos locales de operación",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben identificar los entornos locales de operación y establecer procesos de seguridad, como los siguientes:a.	Perfil de seguridad de localidad física b.	Coordinación de la seguridad local c.	Equipos electrónicos y digitales",vermas:"Ver mas..",recomendaciones:"",numero:32},
  {articulo:"Articulo 33. Aplicaciones de estaciones de trabajo",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:"Se debe establecer procesos para la gestión adecuada como lo siguientes:a.	Inventario de las aplicaciones de estaciones de trabajo b.	Protección de los archivos con información confidencial c.	Protección de las bases de datos d.	Desarrollo de aplicaciones de estaciones de trabajo",vermas:"Ver mas..",recomendaciones:"",numero:33},
  {articulo:"Articulo 34. Dispositivos de computacion Movil",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben establecer mecanismos de seguridad para proteger la información intercambiada a través de los dispositivos de computación móvil utilizados por los colaboradores.",vermas:"Ver mas..",recomendaciones:"",numero:34},
  {articulo:"Articulo 35. Comunicaciones Electrónicas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:"Se deben asegurar las comunicaciones electrónicas, mediante controles y políticas de seguridad cibernética y de la información, se debe tomar en cuenta lo siguiente: a.	Correo electrónico b.	Mensajería instantánea c.	Plataformas de colaboración d.	Servicios de comunicación de voz",vermas:"Ver mas..",recomendaciones:"",numero:35},
  {articulo:"Articulo 36. Gestión de Proveedores Externos de Producción o Servicios Tecnológicos",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se debe asegurar la integración de los requerimientos considerando los siguientes aspectos:a.	Tercerización b.	Requisitos de seguridad a los proveedores externos c.	Adquisición o arrendamiento de equipos y sistemas tecnológicos d.	Contratación de servicios de computación en la nube",vermas:"Ver mas..",recomendaciones:"",numero:36},
  {articulo:"Articulo 37. Gestión de Desarrollo de Sistemas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben establecer un proceso de gestión de desarrollo de sistemas, en el cual se contempla lo siguiente:a.	Metodología de desarrollo de sistemas b.	Entornos de desarrollo de sistemas c.	Aseguramiento de la calidad d.	Interfaces programables de aplicaciones",vermas:"Ver mas..",recomendaciones:"",numero:37},
  {articulo:"Articulo 38. Ciclo de Vida del Desarrollo de Sistemas y Aplicaciones",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se debe adoptar un ciclo de vida para el desarrollo seguro de sus sistemas, tomando en cuenta los siguientes aspectos:a.	Especificaciones de los requerimientos  b.	Diseño de sistemas y aplicaciones c.	Compilación de sistemas y aplicaciones d.	Pruebas de sistemas y aplicaciones e.	Pruebas de seguridad f.	Proceso de instalación  g.	Revisiones luego de las implementaciones",vermas:"Ver mas..",recomendaciones:"",numero:38},
  {articulo:"Articulo 39. Seguridad Física y del Entorno",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben definir los mecanismos que provean las condiciones de seguridad física y del entorno adecuado de las instalaciones críticas.",vermas:"Ver mas..",recomendaciones:"",numero:39},
  {articulo:"Articulo 40. Continuidad de las Operaciones Tecnológicas",subtotal:0,subpuntuacion:0,color:"danger 3",madurez:0,colorm:"danger",descripcion:" Se deben definir los procesos que provean las capacidades necesarias que procuren garantizar la continuidad de las operaciones tecnológicas ante incidentes de seguridad cibernética y de la información que puedan afectar las operaciones.",vermas:"Ver mas..",recomendaciones:"",numero:40}];          
 
//preguntas es el array que guarda las preguntas de cada articulo
//es importante resaltar que los segmentos de preguntas deben ir en el orden en el que se ingresaron los articulos en la variable articulos.
//si en la variable articulos en primer lugar esta un articulo, se debe de poner en primer lugar sus preguntas en el array preguntas.
//en este array no se debe modificar nada, mas que las variables pregunta, indice, y recomendaciones.
//pregunta guarda la pregunta del articulo, indice guarda el numero que le corresponde a esa pregunta,validacion es la varibale encargada de habilitar el uso del barrating
//color es la variable encargada de guardar el color que le corresponde a esa pregunta segun su puntuacion de madurez.
//progres calcula el porcentaje de la barra de progreso.
//currenRate guarda el nivel de madurez de la pregunta.
//recomendaciones, guarda las tres recomendaciones de cada pregunta. 
preguntas = [[{pregunta :"¿Sus politicas contemplan procesos de la gestion de la seguridad cibernetica y de la información?",indice:1,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Creacion de politicas para la gestion de seguridad", "Actualizar las politicas de los procesos de gestion de seguridad", "Evaluar el cumplimiento de las politicas de gestion de seguridad."]},
                {pregunta:"¿Sus politicas contemplan procedimientos de la gestion de la seguridad cibernetica y de la información?",indice:2,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Creacion de politicas para la gestion de seguridad", "Actualizar las politicas de los procesos de gestion de seguridad", "Evaluar el cumplimiento de las politicas de gestion de seguridad."]},
                {pregunta:"¿Poseen un plan de evaluación continua para mantener y monitorear el cumplimiento de las politas de la gestion de la seguridad ciberneticas y de la información?",indice:3,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un plan de evaluacion para el monitoreo de las politicas de la gestion de seguridad.", "Actualizar las politicasa para la gestion de la seguridad", "Manterner actualizado el plan de gestion de seguridad cibernetica."]},
                {pregunta:"¿Sus colaboradores conocen las politicas de la gestion de la seguridad cibernetica y de la información que se maneja?",indice:4,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas de autoayuda.", "Crear cursos para que los colaboradores conozcan las polticas.", "Mantener evaluado a los colaboradores para el conocimiento de politicas"]},
                {pregunta:"¿Utiliza diferentes medios de comunicación (pizarras informativas, boletines, panfletos, email, conferencias, capacitaciones) para dar a conocer sus politicas de la gestion de la seguridad cibernetica y de la informacion?",indice:5,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear los medios de comunicación adecuado para las politicas de gestion de seguridad de la informacion", "Actualizar los medios de comunicación para que siempre sean adecuados", "Mantener al uso optimo los medios de comunicación de gestion de la seguridad"]}
                    ],[
                {pregunta:"¿Tiene un documento formal que establezca la responsabilidades generales y especificas de seguridad cibernética y de la informacion, si el inciso no esta contemplando en el contrato con el colaborador ?",indice:6,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un documento con las responsabilidade de los colaboradores.", "Mantener actualizado el documento con las responsabilidades de los colaboradores", "Realizar las evaluaciones a los colaboradores para mantener las responsabilidades."]},
                      {pregunta:" ¿Las responsabilidades generales y especificas de seguridad cibernética y de la información estan detalladas con claridad en el contrato y los colaboradores lo entienden?",indice:7,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear con claridad los contratos de los colaboradores", "Detallar las responsabilidad generales y especidficas de la seguridad cibernetica con cada colaborador.", "Mantener actualizado la informacion de las responsabilidad de los colaboradores."]},
                      {pregunta:"¿Las responsabilidades generales y especificas de seguridad cibernética y de la información estan establecidad para cada entidad que operan en la empresa?",indice:8,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear con claridad los contratos de los colaboradores", "Detallar las responsabilidad generales y especidficas de la seguridad cibernetica con cada colaborador.", "Mantener actualizado la informacion de las responsabilidad de los colaboradores."]},
                      {pregunta:"¿Las responsabiliades generales y especificas de seguridad cibernética y de la información son evaluadas periodicamente para su actualización?",indice:9,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear con claridad los contratos de los colaboradores", "Detallar las responsabilidad generales y especidficas de la seguridad cibernetica con cada colaborador.", "Mantener actualizado la informacion de las responsabilidad de los colaboradores."]}
                
              ],[
                {pregunta:"¿En su empresa se promueve una cultura de seguridad cibernética y de la información?",indice:10,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear charlas para los colaboradores sobre la seguridad cibernetica", "Mantener actualizado los conocimientos sobre la seguridad cibernetica.", "Tener documentacion necesaria sobre lo relacionado con seguridad cibernetica."]},
                      {pregunta:" ¿Poseen programas continuos de sensibilización sobre el rol de los colaboradores en la seguridad cibernética y de la información?",indice:11,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear programas para para la sensibilizacion de roles de informacion", "Mantener actualizado los programas de seguridad cibernetica", "Crear politicas para el control de roles"]},
                      {pregunta:"¿Sus colaboradores tienen conocimiento del uso correcto de los sistemas de información e infraestrucutra tecnológica?",indice:12,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear procedimientos para el adecuado uso de sistemas de informacion", "crear capacitaciones sobre el uso crorrecto de los sistemas", "Monitorera y controlar el adecuado uso de los sistemas de informacion"]},
                      {pregunta:"¿Tienen programas continuos de capacitacion técnica dirigidos a los colaboradores responsables de la seguridad cibernética y de la información?",indice:13,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear procedimientos para el adecuado uso de sistemas de informacion", "crear capacitaciones sobre el uso crorrecto de los sistemas", "Monitorera y controlar el adecuado uso de los sistemas de informacion"]},
                      {pregunta:"¿Tienen la provision de los recursos adecuados para apoyar la efectividad de los programas continuos de sensibilización de seguridad cibernética y de la información?",indice:14,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Tener un plan de contigencia para salvarguardar la informacion", "Crear politicas para crear programas de sensiblizacion de informacion", "Monitorear y mantener actualizado los recursos de los programas continuos de seguridad"]}
                
              ],[
                {pregunta:"¿Poseé un esquema de gestión de activos información?",indice:15,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un esquema de gestion de activos", "Mantener actualizado el esquema de gestion de activos", "Monitorear y controlar que el esquma de gestion de activos sea correcto"]},
                      {pregunta:"¿Tiene una clasificación de activos de información que se lleva acabo de acuerdo con el nivel de confidecnialidad y sensibilidad de la información?",indice:16,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una clasificaciond e activos ", "Mantener actualizado la clasificacion de gestion de activos", "Monitorear y controlar la clasificacion de gestion de activos sea correcto"]},
                      {pregunta:"¿Sus documentos son manejados de forma sistematica y estructurada?",indice:17,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un procedimiento para el manejo adecuado de documentacion", "Monitorea que la documentacion sea almacenado de forma adecuada", "Actualizar y mejorar los procedimientos de documentaicon "]},
                      {pregunta:"¿La información sensible en formato fisico esta protegida contra corrupción, pérdida o divulgación no autorizada?",indice:18,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un procedimiento para el manejo adecuado de documentacion", "Monitorea que la documentacion sea almacenado de forma adecuada", "Actualizar y mejorar los procedimientos de documentaicon "]},
                      {pregunta:"¿Los sistemas informaticos y equipos de la infraestructura tenológica estan registrados en un repositorio?",indice:19,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una clasificaciond e activos ", "Mantener actualizado la clasificacion de gestion de activos", "Monitorear y controlar la clasificacion de gestion de activos sea correcto"]}
                
              ],[
                {pregunta:" ¿Utiliza funcionalidades de seguridad de la información alineadas a la infraestrucutra técnica de seguridad?",indice:20,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas de seguridad de la informacion en la infraestructura", "Monitorear el cumplimiento de las politicas de infromacion en la infraestructura", "Actualizar y mejora continua de las politicas de la seguridad"]},
                      {pregunta:" ¿Las funcionalidades de seguridad de la información cumplen con la confidencialidad, integridad y disponibilidad de la información?",indice:21,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas que ayuden a verificar el cumplimiento de la CIA", "Monitorear que las politicas se cumplan a su cabalidad", "Actualizar y mejorar las politicas de cumplimiento de CIA"]},
                      {pregunta:"¿Sus controles de aplicaciones y servicios transaccionales son internos como externos ?",indice:22,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear controles internos y externos para aplicaciones", "Crear politicas para el adecuado control externo e interno de aplicaciones", "Monitorear el correcto cumplimiento de politicas para el control externo e interno de las aplicaciones "]},
                      {pregunta:"¿Sus controles contemplan los servicios hacia internet, basados en el navegador y en los servidores en donde se ejecutan?",indice:23,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear controles para el uso del internet", "Crear politicas adecuadas para el manejo de internet", "Monitorear el cumplimiento de las politicas de internet"]},
                      {pregunta:"¿Sus controles de seguridad protegen la confidencialidad e integridad de la información, cuando es ingresada, procesada o extraida de la aplicación?",indice:24,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas que ayuden a verificar el cumplimiento de la CIA", "Monitorear que las politicas se cumplan a su cabalidad", "Actualizar y mejorar las politicas de cumplimiento de CIA"]}
                
              ],[
                {pregunta:"¿Los contratos con los clientes tienen especificadas las politicas relacionadas a la privacidad de la información?",indice:25,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas para contratos de privacidad con los clientes", "Verificar que se cumplen las polticas existente con ls clientes", "Monitorear y actulaizar politcas de controles de privacidad como sea necesario"]},
                      {pregunta:" ¿Las politicas de privacidad contemplan datos de carácter personal utilizados en sus productos y servicios?",indice:26,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas de privacidad para productos y servicios", "Monitorear el cumpliemitno de las politicas de privacidad de productos y servicios", "Actualizar las politicas de privacidad cada 6 meses"]},
                      {pregunta:"¿Las politicas de privacidad contemplan las modificaciones a los datos de carácter personal, de prodcutos o servicios?",indice:27,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Monitorear las politicas de privacidad sean adecuadas al rol de la empresa", "Actualizar las politicas de privacidad", "Crear politicas en base a las normas ISO"]},
                      {pregunta:"¿Las politicas de privacidad contienen el desglose del uso que la entidad receptora de información dará a cada tipo de información?",indice:28,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Monitorear las politicas de privacidad sean adecuadas al rol de la empresa", "Actualizar las politicas de privacidad", "Crear politicas en base a las normas ISO"]},
                      {pregunta:"¿Las politicas de privacidad contienen la recopilación de datos y su divulgación a través de medios fisicos o electrónicos?",indice:29,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas para contratos de privacidad con los clientes", "Verificar que se cumplen las polticas existente con ls clientes", "Monitorear y actulaizar politcas de controles de privacidad como sea necesario"]}
                
              ],[
                {pregunta:"¿Actulizan sus terminos de uso?",indice:30,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Mantener actualizados los terminos de uso en la seguridad", "Crear politicas para la actualizacion de terminos de uso cada cierto tiempo", "monitorear el cumplimiento de los terminos de uso."]},
                      {pregunta:"¿Los terminos de uso y condiciones cubren los aspectos de seguridad cibernética y de la información?",indice:31,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer las condicioens adecuadas en la seguridad cibernetica", "Actualizar las condiciones establecidas", "Crear politicas actualizadas una vez al año en la organizaicon"]},
                      {pregunta:"¿Gestion los terminos y condiones de uso?",indice:32,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas para la gestion de terminos y condiciones de uso", "Monitorear el cumpliemiento de los terminos de uso", "Actualizar politicas de terminos de usos una vez al año"]},
                      {pregunta:"¿Su plan de gestion de terminos y condiciones de uso esta en conformidad con la seguridad cibernética y de la información?",indice:33,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas para la gestion de terminos y condiciones de uso", "Monitorear el cumpliemiento de los terminos de uso", "Actualizar politicas de terminos de usos una vez al año"]}
                
              ],[
                {pregunta:"¿Existe un inventario de conexiones ?",indice:34,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una gestion de conexiones", "Crear politicas que ayuden a la gestion de conexiones", "Monitorar el constante conexión a los sistemas de informacion "]},
                      {pregunta:" ¿Se registran los accesos de los clientes a los servicios de canales electrónicos?",indice:35,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un log de activos de accesos", "Crear politicas de controles de acceso", "Monitorear que se cunplan con los controles de accesos"]},
                      {pregunta:"¿Se registran los accesos de los clientes a los servicios de canales digitales?",indice:36,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una gestion de conexiones", "Crear politicas que ayuden a la gestion de conexiones", "Monitorar el constante conexión a los sistemas de informacion "]},
                      {pregunta:"¿Los accesos de los clientes estan protegidos mediante mecanismos de control y supervisión?",indice:37,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un log de activos de accesos", "Crear politicas de controles de acceso", "Monitorear que se cunplan con los controles de accesos"]}
                
              ],[
                {pregunta:"¿Dentro de su programa de seguridad cibernética y de la información existe la gestion de los accesos de los colaboradores a los sistemas de información e infraestructura tecnólogicas?",indice:38,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un programa de seguridad cibernetica", "Crear politicas para el cumplimiento del programa de seguridad cibernetica", "Monitorerar el cumplieminto del progrmaa de seguridad"]},
                      {pregunta:"¿existen limites y controles para los accesos de los colaboradores a los sistemas de información e infraestructura tecnológica?",indice:39,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas de controles de accesos a los colaboradores", "Monitorear el control de accesos de los colaboradores", "Implementar un comité de soporte de accesos"]},
                      {pregunta:"¿Los controles de accesos a los colaboradores sobre los sistemas de información e infraestructura tecnólogica son previamente autorizados?",indice:40,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas de controles de accesos a los colaboradores", "Monitorear el control de accesos de los colaboradores", "Implementar un comité de soporte de accesos"]},
                      {pregunta:"¿Evaluan el perfil del colaborador antes de otorgarla autorización a los accesos de los sistemas informaticos e infraestructura?",indice:41,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear perfiles de accesos a la seguridad de sistemas", "Implementar un comité de soporte de accesos", "Monitorear el control de accesos de los colaboradores"]}
                
              ],[
                {pregunta:"¿Su metodoloiga identifica los roles y privilegios de accesos?",indice:42,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Identificar los roles y privilegios de los colaboradores", "Entregrar carta de privacidad y no divulgacion", "Monitorear el adecuado uso de los roles"]},
                      {pregunta:"¿Su metodologia proporciona una adecuada matriz de riesgos?",indice:43,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Implementar una metodolgoia de acuerdo a las necesidades de la organización", "Evaluar los riesgos de la organización", "Crear politicas para mitigar riesgos"]},
                      {pregunta:"¿Su metodologia utiliza mecanismos apropidos de control de accesos en las politicas internas?",indice:44,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Implementar politicas de mecanismode accesos", "Evaluar las politicas internas de la organización", "Monitorear y controlar las politicas internas de accesos"]},
                      {pregunta:"¿ Tiene previsto los principios de menor privilegio y menor funciones?",indice:45,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear principios de privilegios", "Evaluar los roles de privilegios", "Monitorear los perfiles de privilegios"]}
                
              ],[
                {pregunta:"¿Sus politicas contemplan procesos de la gestion de la seguridad  de la información e infraestrucutra tecnologica?",indice:46,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear comité de seguridad cibernetica", "Realizar evaluaciones constantes a los integrantes del comité", "Crear politicas"]},
                      {pregunta:" ¿Poseen un plan de evaluación continua para mantener y monitorear el cumplimiento de las politas de la gestion de la seguridad  de la información e infraestructura tecnologica?",indice:47,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un perfil de administracion de usuarios", "Realizar evaluaciones constantes a los perfiles de los usuarios", "Mejora continua a los perfiles de usuarios"]},
                      {pregunta:"¿Sus colaboradores conocen las politicas de la gestion de la seguridad de la información que se maneja?",indice:48,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un perfil de administracion de usuarios", "Realizar evaluaciones constantes a los perfiles de los usuarios", "Mejora continua a los perfiles de usuarios"]},
                      {pregunta:"¿Se realiza un adecuado copias de resguardo y almacenados en un lugar seguro?",indice:49,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear soluciones criptograficas", "Evaluar las soluciones criptograficas", "Crear ploliticas para mostrar las mejores soluciones criptograficas"]}
                
              ],[
                {pregunta:"¿ Se cuenta con un comité de seguridad cibernetica y de la arquitectura tecnologica?",indice:50,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear comité de seguridad cibernetica", "Realizar evaluaciones constantes a los integrantes del comité", "Crear politicas"]},
                      {pregunta:" ¿Se cuenta con un proceso de administracion de perfiles de usuario?",indice:51,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un perfil de administracion de usuarios", "Realizar evaluaciones constantes a los perfiles de los usuarios", "Mejora continua a los perfiles de usuarios"]},
                      {pregunta:"¿Se cuenta con politicas integrales de seguridad cibernetica y de la informacion?",indice:52,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un perfil de administracion de usuarios", "Realizar evaluaciones constantes a los perfiles de los usuarios", "Mejora continua a los perfiles de usuarios"]},
                      {pregunta:"¿Se cuenta con las adecuadas soluciones criptograficas?",indice:53,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear soluciones criptograficas", "Evaluar las soluciones criptograficas", "Crear ploliticas para mostrar las mejores soluciones criptograficas"]}
                
              ],[
                {pregunta:"¿ Se cuenta con una adecuada implementacion de procesos  y plataformas para la gestion segura de red?",indice:54,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Implementar procesos de gestion de red", "Crear politicas para la gestion de lar ed", "Monitorera el uso de lared"]},
                      {pregunta:" ¿Se cuenta configurado de forma adecuada los dispositivos de red?",indice:55,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Revisar las configuraciones de todos los dispositivos de la organización", "Crear politicas sobre el uso de dispositivos", "Monitorear el adecuado configuracion de los dispositivos de red"]},
                      {pregunta:"¿Se cuenta con los adecuados controles fisicos de red?",indice:56,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear controles fisicos de red", "Crear politicas para el monitoreo de los controles fisicos de la red", "Crear un grupo para controlar los controles fisicos de la red"]},
                      {pregunta:"¿Se cuenta con los adecuados controles externos de red y sistemas informaticos?",indice:57,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear controles externos para la red", "Verificar el cumplimiento de los controles externos de la red", "Monitorear el cumplimiento de las politicas de controles externos de la red"]},
                      {pregunta:"¿ Cuenta con controles de mantenimiento remoto y acceso inalambrico?",indice:58,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear controles de mantenimiento remoto y accesos", "Verificar las politicas de accesos remotos", "Actualizar politicas de mantenimiento remoto"]}
                
              ],[
                {pregunta:"¿Se cuenta con un reglamento de conexiones a los sistemas de informacion?",indice:59,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear reglamento de conexiones de informacion", "Evaluar politicas de reglamentos de conexiones", "Monitorear el control de reglamentos de conexiones"]},
                      {pregunta:" ¿Posee adecuada implementacion para garantizar la disponibilidad de los servicios?",indice:60,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un respaldo de disponibilidad de servicios", "Monitorear la implementacion de servicios", "Crear politicas de disponibildiad de servicios"]}
                
              ],[
                {pregunta:"¿ Se cuenta con procesos adecuados de analisis, monitoreo y apoyo de evaluaciones integrales de vulnerabilidades?",indice:61,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Implementar procesos para el monitoreo de evaluaciones vulnerabilidades", "Monitoreo del cumplimiento de las evaluaciones de vulnerabildiades", "Creacion de una unidad de evaluacion de vulnerabilidades"]},
                      {pregunta:" ¿Las funcionalidades de seguridad de la información cumplen con la confidencialidad, integridad y disponibilidad de la información?",indice:62,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas que ayuden a verificar el cumplimiento de la CIA", "Monitorear que las politicas se cumplan a su cabalidad", "Actualizar y mejorar las politicas de cumplimiento de CIA"]},
                      {pregunta:"¿ Se cuenta con una adecuada actualizacion de los sitemas de informacion?",indice:63,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Creacion de politicas para la actualizacion constante de los sistemas de informacion", "Monitoreo de los sistemas de informacion", "Implementar un area de soportes de sistemas de informacion"]},
                      {pregunta:"¿ Se cuenta con estrategias de inteligencia contra amenazas de informacion?",indice:64,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realizar una evaluacion de amenazas", "Crear politicas de inteligencia de amenazas", "Monitorea el cumplieminetos de las evaluaciones"]},
                      {pregunta:"¿Se cuenta con los servicios adecuados para las vulnerabildiades y amenazas tecnologicas?",indice:65,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Creacion de politicas para la actualizacion constante de los sistemas de informacion", "Monitoreo de los sistemas de informacion", "Implementar un area de soportes de sistemas de informacion"]}
                
              ],[
                {pregunta:"¿Se cuenta con medidas contra ataques e incidentes de seguridad de la informacion?",indice:66,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Implementar procesos para el monitoreo de evaluaciones vulnerabilidades", "Monitoreo del cumplimiento de las evaluaciones de vulnerabildiades", "Creacion de una unidad de evaluacion de vulnerabilidades"]},
                      {pregunta:" ¿Se cuenta con metodos eficaz para correctivos de emergencias?",indice:67,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear metodos de correcion de emergencia", "Crear politicas para control de emergencias ", "Monitorear el cumplimiento y creacion de escenarios de emergencias"]},
                      {pregunta:"¿Se cuenta con procesos de investigacion forense?",indice:68,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear procedimientos de investigacion forense", "Crear politicas de investigacion forense", "Monitorear que se cumplan con todos los procesos adecuados en la investigacion forense"]}
                      
                
              ],[
                {pregunta:"¿Cuenta con perfiles de seguridad de localidad fisica?",indice:69,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear perfiles de seguridad fisica", "Crear politicas de los perfiles de la seguridad fisisca", "Monitorear el cumplieminto de los perfiles de la seguridad fisica"]},
                      {pregunta:" ¿ Se cuenta con las medidas para coordinar actividades de seguridad?",indice:70,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear actividades para medir la seguridad", "Crear politicas de perfiles de seguridad ", "Monitorear el cumpliemento de las actividades de seguridad"]}
                
              ],[
                {pregunta:"¿Existe un inventario de aplicaciones en el area de trabajo?",indice:71,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realizar inventario de activo de las oficinas", "Crear politicas para actualizacion de los activos de las oficna", "monitorear el control adecuado de los activos de la oficna"]},
                      {pregunta:" ¿Se cuenta con la adecuada proteccion de archivos?",indice:72,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas de proteccion de archivos", "Monitorear la proteccion de archivos", "Actualizar politicas de proteccion de archivos adecuadas"]},
                      {pregunta:"¿Se cuenta con la adecuada protecion de la base de datos?",indice:73,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas de proteccion de base de datos", "Monitorear las politicas de base de datos", "Actualizar la politicas de base de datos"]}
                
              ],[
                {pregunta:"¿Existe metodos de segridad para acceso remotos a los dispositivos de la estacion de trabajo?",indice:74,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear politicas de control de accesos remotos", "Monitorear el cumpliemiento de las politicas", "Actualizar  las politicas con la mejores practicas"]},
                      {pregunta:" ¿Se cuenta con la gestion centralizada de dispositivos moviles?",indice:75,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear una gestion de dispositivos moviles", "Crear politicas de uso de dispositivos moviles", "Monitorear el cumplimiento de la politica de activos moviles"]}
                
              ],[
                {pregunta:"¿Cuenta con controles de dominios internos y Externos en su corporación?",indice:76,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Asignar correo externo a Gerentes", "Asignar correo electrónico a colaboradores de puestos claves", "Restringir acceso a correos externos a los colaboradores, salvo a Gerentes, jefes y puestos claves."]},
                      {pregunta:" ¿La mensajería Instantánea está aplicada únicamente a puestos claves?",indice:77,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un plan para asignar a los puestos que accederán a la mensajería", "Asignar a colaboradores de puestos claves el acceso a mensajería instantánea", "Realizar evaluaciones de cumplimiento"]},
                      {pregunta:"¿Las plataformas que se utiliza en la corporación, cuentan con configuraciones que van acorde al puesto que tiene el usuario?",indice:78,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un plan para determinar los usuarios que tendrán acceso a la plataforma", "Asignar a los usuarios acceso a portal según políticas de seguridad definidas", "Realizar evaluaciones de cumplimiento y mejora"]},
                      {pregunta:"¿Los servicios de teléfonos corporativos se encuentran restringidos para hacer llamadas externas?",indice:79,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un plan para asignar extensiones a colaboradores que lo necesiten", "Asignar a colaboradores con puestos claves ", "Realizar un check list y control de las extensiones asignadas para corroborar cumplimiento políticas de seguridad"]},
                      {pregunta:"¿Las llamadas externas se otorga acceso a puestos claves?",indice:80,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un plan y definir políticas para asignar permisos", "Asignar a los puestos claves los permisos de llamadas claves", "Realizar un check list y control de las extensiones asignadas para corroborar cumplimiento políticas de seguridad"]}
                
              ],[
                {pregunta:"¿Antes de contratar un tercerizador, se analiza cuáles son las necesidades que deberá cubrir?",indice:81,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realizar un plan para analizar si es necesario la adquisición de un tercero", "Establecer los planes que debe cumplir el proveedor por medio de los SLA's", "Reestablecer los SLA´s (si lo necesitan) para asegurar los servicios "]},
                      {pregunta:" ¿Se realiza contratos de SLA’s con los proveedores?",indice:82,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un plan para documentar y determinar las políticas que se trabajará con el proveedor", "Corroborar que el proveedor cumpla con los SLA's", "Reestablecer los SLA´s (si lo necesitan) para asegurar los servicios "]},
                      {pregunta:"¿Se comprueba que el proveedor cumpla con alguna norma ISO relacionado a la Ciberseguridad?",indice:83,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un plan para documentar y determinar las políticas que se trabajará con el proveedor.  Estudiar que el proveedor cumpla con un mínimo de 2 normas internacionales", "Corroborar que el proveedor cumpla con los SLA's", "Reestablecer los SLA´s (si lo necesitan) para asegurar los servicios "]},
                      {pregunta:"¿Se investiga como mínimo tres proveedores antes de adquirir un servicio o equipo?",indice:84,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Crear un plan para documentar y determinar las políticas que se trabajará con el proveedor", "Analizar a los proveedores por medio de pruebas de calidad para determinar la conveniente", "Establecer los contratos SLA's y documentarlos"]},
                      {pregunta:"¿Se realiza un análisis sobre qué proveedor cumplirá con las necesidades que necesite la corporación?",indice:85,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer manejo de buenas prácticas y determinar ambientes de pruebas", "Administrar ambientes de pruebas ya que no deben tener mayores privilegios", "Eliminar los ambientes de pruebas para que el externo lo tenga accesos"]}
                
              ],[
                {pregunta:"¿Existe segmentación antes de desarrollar un sistema?",indice:86,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer política de procesos para segmentar los roles que debe realizar cada colaborador", "Verificar que las políticas se cumplan", "Analizar y comprobar de forma anual si las políticas deben ser actualizadas"]},
                      {pregunta:" ¿Cuentan con políticas de Seguridad entre las áreas de TI?",indice:87,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer política de procesos para segmentar los roles que debe realizar cada colaborador", "Verificar que las políticas se cumplan", "Analizar y comprobar de forma anual si las políticas deben ser actualizadas"]},
                      {pregunta:"¿El área de Sistemas cuenta con pruebas de QA antes de ser publicado?",indice:88,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer política de procesos para segmentar los roles que debe realizar cada colaborador", "Verificar que las políticas se cumplan y documentar los hallazgos", "Analizar y comprobar de forma anual si las políticas deben ser actualizadas"]},
                      {pregunta:"¿Los sistemas desarrollados cuentan con una capa de Seguridad?",indice:89,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer política de procesos para segmentar los roles que debe realizar cada colaborador", "Verificar que las políticas se cumplan y documentar los hallazgos", "Analizar y comprobar de forma anual si las políticas deben ser actualizadas"]},
                      {pregunta:"¿los centros de datos cuentan con equipos contra incendios adecuados a su entorno?",indice:90,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer políticas de seguridad para determinar el equipo de protección adecuado", ", "]}
                
              ],[
                {pregunta:"¿Durante la toma de requerimientos, se contempla el nivel de seguridad que se aplicará al sistema?",indice:91,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Plan estratégico para la toma de requerimientos", "Implementación de políticas y metodologías para la toma de requerimientos", "Capacitar al usuario "]},
                      {pregunta:"¿Se aplica la práctica del ciclo de Vida de un Sistema?",indice:92,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["No cuenta con metodologías de ciclo de vida para los sistemas", "Se cuenta con planes estratégicos para evaluar el ciclo de vida de los sistemas", "Se establece planes de evaluaciones periódicas para disminuir incidentes"]},
                      {pregunta:"¿Los sistemas cuentan con codificación y personalización de paquetes?",indice:93,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer y determinar la personalización de los paquetes", "Implementación de manuales de buenas prácticas", "Capacitar al usuario "]},
                      {pregunta:"¿El sistema desarrollado pasa por pruebas de Etical Haking?",indice:94,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer planes de Ética Hacking ", "Implementar planes periódicos de ética hacking para determinar nivel de seguridad", "Mejorar las metodologías, políticas y buenas prácticas"]},
                      {pregunta:"¿Se realiza seguimiento a los Sistemas una vez instalados?",indice:95,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer planes de seguimiento a los sistemas instalados", "Evaluar los sistemas para determinar si continúan con los servicios", "Establecer manejos y planes de incidentes en base a las evaluaciones"]}
                
              ],[
                {pregunta:"¿Los servidores cuentan con protección contra desastres naturales?",indice:96,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer planes estratégicos como BIA", "Implementar políticas y manuales de seguridad relacionados al BIA", "Capacitar al usuario y brindar recursos "]},
                      {pregunta:" ¿El centro de datos se encuentra restringido ante accesos físicos no autorizados?",indice:97,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer accesos restringidos Colocar equipos de vigilancia Establecer controles de accesos ", "Implementar políticas y controles por medio de equipos de vigilancia y detector de huellas", "Capacitar al usuario Aplicar control de Accesos "]},
                      {pregunta:"¿El centro de datos cuenta con avisos de salidas de emergencia?",indice:98,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer rutas de evacuación", "Colocar mapas de rutas de evaluación Colocar Señalizaciones de las rutas de evaluación", "Capacitar a los usuarios Aplicar procedimientos de manejos e incidentes"]},
                      {pregunta:"¿La infraestructura cuenta con una planta eléctrica?",indice:99,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer evaluación de capacidad para la planta eléctrica", "Colocar planta eléctrica a centros de datos", "Realizar mantenimientos a la planta eléctrica"]},
                      {pregunta:"¿La infraestructura cuenta con protección de Para-rayos?",indice:100,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realizar planes de inversión para determinar cantidad y capacidad que se aplicará a los centros de datos", "Colocar los para-rayos en lugares estratégicos", "Capacitar a los encargados de centros de datos"]}
                
              ],[
                {pregunta:"¿Se realiza un análisis de riesgo cuando existe una caída de procesos?",indice:101,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Establecer planes estratégicos como BIA", "Aplicar y determinar políticas de seguridad", "Capacitar al usuario Realizar actualizaciones de los procesos anualmente"]},
                      {pregunta:" ¿Se realiza una prueba de estrés relacionado a la continuidad de las operaciones tecnológicas?",indice:102,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Realizar planes estratégicos y procesos a ejecutar", "Aplicar los procesos como buena práctica", "Capacitar al usuario Verificar que los procesos sean cumplidos"]},
                      {pregunta:"¿Existe un manual donde defina los roles que debe realizar cada equipo ante la incidencia de ataque de Ciber Seguridad?",indice:103,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Definir manual de seguridad y estándares donde se regirán", "Implementar el manual de seguridad", "Capacitar al usuario "]},
                      {pregunta:"¿¿Existen documentos con planes de recuperación ante desastres tecnológicos??",indice:104,validacion:false,color:"danger",currentRate:0,progres:0,recomendaciones:["Definir planes para determinar los roles que debe ejercer cada usuario", "Implementar los planes estratégicos ", "Capacitar al usuario Notificar a toda la corporación sobre los planes estratégicos"]}
                
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

    this.router.navigate(['/Titulodos/Capitulotres']);

    }
  ngOnInit() {
  }

}
