import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class ProfissaoService {

  constructor(private http: HttpClient) { }

  getProfissaoList(): Observable<any> {
    return this.http.get<any>(AppConstants.BaseUrlPath + 'profissao/');
  }
}
