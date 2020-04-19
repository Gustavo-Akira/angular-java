import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {

  }
  getUsuarioList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }
  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, {responseType: 'text'});
  }
  consultarUsuario(nome: string): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'filtro/' + nome);
  }

  consultarUsuarioPorPage(nome: string, page: number): Observable<any>{
    return this.http.get(AppConstants.baseUrl + 'filtro/' + nome + '/page/' + page);
  }
  getUsuario(id: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }
  getUsuarioPage(id: number): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + id);
  }
  salvarUsuario(usuario): Observable<any> {
    console.log(usuario);
    return this.http.post<any>(AppConstants.baseUrl, usuario);
  }
  editarUsuario(usuario): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, usuario);
  }
  usuarioAutenticado(): boolean{
    if (localStorage.getItem('token') != null && localStorage.getItem('token').toString().trim() != null) {
      return true;
    } else {
      return false;
    }
  }
  removerTelefone(id): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + 'telefone/' + id, {responseType: 'text'});
  }
  downloadPdf() {
    return this.http.get(AppConstants.baseUrl + 'relatorio',{responseType:'text'}).subscribe(data=>{
      document.querySelector('iframe').src = data;
    });
  }
}
