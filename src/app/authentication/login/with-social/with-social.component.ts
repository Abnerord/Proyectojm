import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-with-social',
  templateUrl: './with-social.component.html'
})
export class WithSocialComponent implements OnInit {

  constructor(private login: LoginService,private router: Router) { }


  log(form){

    let user = form.value.nombre;
    let pass = form.value.password;

    this.login.logincheck(user,pass).subscribe((data: Response)=>{

     
      for(let key in data){

        if(data[key] == "OK"){
          this.router.navigate(['/dashboard']);
        }
      }
        
    })
  }

  ngOnInit() {

  }

}
