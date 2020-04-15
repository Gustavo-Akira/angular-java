import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { error } from '@angular/compiler/src/util';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private route: Router ) { }
  login(usuario) {

    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
      const token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];
      localStorage.setItem( 'token' , token);
      this.route.navigate(['home']);
    },
    // tslint:disable-next-line: no-shadowed-variable
    error => {
        console.error(error);
        document.querySelector('#erros').removeAttribute('style');
        // tslint:disable-next-line: triple-equals
        if (error.status == 403) {
        document.querySelector('#erros').innerHTML = 'Erro Usuario ou senha incorretos';
        } else {
          document.querySelector('#erros').innerHTML = 'Erro no servidor tente novamente mais tarde';
        }
    }
    );
  }
}
