import { Component, OnInit, Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ProfissaoService } from 'src/app/service/profissao.service';
import { Observable } from 'rxjs';
import { Profissao } from 'src/app/model/profissao';

@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';
  fromModel(value: string): NgbDateStruct {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }
    }
    return null;
  }
  toModel(date: NgbDateStruct | null): string | null{
      return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }


}

@Injectable()
export class FormatData extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null{
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }
    }
    return null;
  }
  format(date: NgbDateStruct): string | null {
    return date ? this.validarDia(date.day) + this.DELIMITER + this.validarDia(date.month) + this.DELIMITER + date.year : '';
  }

  validarDia(valor) {
    if (valor.toString !== '' && parseInt(valor, 10) <= 9){
      return '0' + valor;
    }
    return valor;
  }
  toModel(date: NgbDateStruct | null): string | null{
   return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormatData}, {provide: NgbDateAdapter, useClass: FormatDateAdapter}]
})
export class UsuarioAddComponent implements OnInit {
  usuario = new User();
  profissoes: Array<Profissao>;
  telefone = new Telefone();
  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService, private profissaoService: ProfissaoService) { }

  ngOnInit() {
    this.profissaoService.getProfissaoList().subscribe(data =>{
      this.profissoes = data;
      console.log(data);
    });
    const numero = this.routeActive.snapshot.paramMap.get('id');
    let id: number = null;
    if (numero != null) {
      id = Number.parseInt(numero, 10);
    } else {
      id = null;
    }
    if ( id != null) {
      this.userService.getUsuario(id).subscribe(data => {
        this.usuario = data;
        console.log(data);
      });
    }
  }
  salvarUsuario() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) {
        this.userService.editarUsuario(this.usuario).subscribe(data => {
          this.novo();
          console.log('Editando');
      });
    } else {
      this.userService.salvarUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.log('Salvando');
      });
    }
  }
  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }
  deleteTelefone(id,i): void {
    if (id !== null && confirm('Deseja remover ?')) {
      this.userService.removerTelefone(id).subscribe(data => {
        this.usuario.telefones.splice(i,1);
      });
    }
  }
  addFone() {
    if (this.usuario.telefones === undefined){
      this.usuario.telefones = new Array<Telefone>();
    }
    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }
}
