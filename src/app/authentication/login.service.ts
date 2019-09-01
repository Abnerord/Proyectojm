import { Injectable } from '@angular/core';
import {Http, Response,RequestOptions, Headers} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()
export class LoginService {



  constructor(private http: Http) { }

  logincheck(username,password){

   let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
   let options = new RequestOptions({ headers: headers });

   let envio = JSON.stringify({'username':username,'password':password})


    return this.http.post("http://localhost/server_data/usuarios_prueba.php", envio).pipe(map((res: Response)=> res.json()));
  }


}
