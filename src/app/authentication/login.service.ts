import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class LoginService {



  constructor(private http: Http) { }

  logincheck(username,password){



   let envio = JSON.stringify({'username':username,'password':password})


    return this.http.post("http://localhost/server_data/usuarios_prueba.php", envio).pipe(map((res: Response)=> res.json()));
  }

  contulaEmp(){
    return this.http.get("http://localhost/server_data/getEmpresa.php").pipe(map((res: Response)=> res.json()));
  }

  inEmp(nombre,direccion,correo,telefono){
    let envio = JSON.stringify({'nombre':nombre,'direccion':direccion,'correo':correo,'telefono':telefono})
    return this.http.post("http://localhost/server_data/new_emp.php",envio).pipe(map((res: Response)=> res.json()));
  }


}
