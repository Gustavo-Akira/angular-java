import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'alexa';
  usuario = {login: '', senha: ''};
  ngOnInit(): void {
  }

   constructor(private loginService: LoginServiceService){}
    public login(){
      this.loginService.login(this.usuario);
    }


}
