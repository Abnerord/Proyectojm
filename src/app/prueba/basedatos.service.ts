import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';

@Injectable()

export class BasedatosService {

  constructor(private http: Http) {}

  login(){
    return this.http.get("http://localhost/bd/server/getEvents.php").pipe(map((res: Response)=> res.json()));
  }

  

}
