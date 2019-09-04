import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login.service';
import {VariablesglobalesService} from '../../../variablesglobales.service';
import {Router} from '@angular/router'
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-with-social',
  templateUrl: './with-social.component.html'
})
export class WithSocialComponent implements OnInit {
  last;
  validacion = false;
  anuncio = false;
  elegir = false;
  empresas: any[]=[];

  constructor(private login: LoginService,private router: Router, public user: VariablesglobalesService) { }

  registro(){
    this.router.navigate(['/authentication/lock-screen']);
    
  }

  click(){
    this.elegir = false;
  }

  log(form){

    let user = form.value.nombre;
    let pass = form.value.password;

    if(this.validacion == false){
    this.login.logincheck(user,pass).subscribe((data: Response)=>{

     
      for(let key in data){

        if(data[key] == "OK"){
          this.validacion = true;
          this.anuncio = false;
          this.user.usuariologin.nombre = form.value.nombre;
          //this.router.navigate(['/dashboard']);
        }else{
          this.anuncio = true;
          this.validacion = false;
        }
      }
        
      })
    }else{
      if(form.value.select == ""){
          this.elegir = true;
      }else{
        this.elegir = false;
        this.router.navigate(['/Titulouno/Capitulotres']);
        this.user.usuariologin.empresa = form.value.select; 
        for (let key in this.empresas){
          if ( this.empresas[key].nombre == this.user.usuariologin.empresa){
              this.user.usuariologin.id = this.empresas[key].id;
          }
        }
        console.log(this.user.usuariologin)
      }
    }
  }

  ngOnInit() {
    this.login.contulaEmp().subscribe((data:Response)=>{
      for(let key in data){
        this.empresas.push(data[key]);
      }
  })
  }

}
