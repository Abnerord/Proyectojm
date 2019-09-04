import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
import {VariablesglobalesService} from '../../variablesglobales.service';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html'
})
export class LockScreenComponent implements OnInit {

  constructor(private login: LoginService,private router: Router, private user: VariablesglobalesService) { }

  ngOnInit() {
  }

  onSubmit(form){

    this.login.inEmp(form.value.nombre,form.value.direccion,form.value.correo,form.value.telefono).subscribe((data:Response)=>{
      for(let key in data){

        if(data[key] == "OK"){
          this.router.navigate(['/Titulouno/Capitultres']);
          this.user.usuariologin.empresa = form.value.nombre;
          console.log(this.user.usuariologin)
        }
      }
    })
  }
}
