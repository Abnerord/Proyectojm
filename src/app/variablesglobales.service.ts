import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class VariablesglobalesService {

  usuariologin = {id:0,nombre:"",empresa:""}
  
  constructor(private http: Http) { }

  ingresoArticulo(nombre,descripcion,madurez,recomendacion,sub_total,sub_puntuacion,id_empresa,fecha,numero,colorm){
    let envio = JSON.stringify({'nombre':nombre,'descripcion':descripcion,'madurez':madurez,'recomendacion':recomendacion,'subtotal':sub_total,'subpuntuacion':sub_puntuacion,'idempresa':id_empresa,'fecha':fecha,'numero':numero,'colorm':colorm});
   
    return this.http.post("http://localhost/server_data/new_art.php", envio).pipe(map((res: Response)=> res.json()));
  }

  Articulo(id_empresa){
    let envio = JSON.stringify({'idempresa':id_empresa});
    console.log(envio);
    return this.http.post("http://localhost/server_data/getArticulo.php", envio).pipe(map((res: Response)=> res.json()));
  }


  ingresoPregunta(pregunta,numeroart,nivel,progres,idarticulo){
    let envio = JSON.stringify({'pregunta':pregunta,'numeroart':numeroart,'nivel':nivel,'progres':progres,'idarticulo':idarticulo});
    return this.http.post("http://localhost/server_data/new_preg.php", envio).pipe(map((res: Response)=> res.json()));
  }
}
