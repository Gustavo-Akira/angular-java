import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: Array<User[]>;
  nome: string;
  total: number;
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
    });
  }
  deletaUsuario(id: number, index) {
    if (confirm('Deseja mesmo excluir ?')){
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        this.usuarios.splice(index, 1);
      });
    }
  }
  consultarUser() {
    if (this.nome === '') {
      this.usuarioService.getUsuarioList().subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements;
      });
    } else {
      this.usuarioService.consultarUsuario(this.nome).subscribe(data => {
        this.usuarios = data.content;
        this.total = data.totalElements
      });
    }
  }
 carregarPagina(pagina) {
   if (this.nome !== '') {
      this.usuarioService.consultarUsuarioPorPage(this.nome, pagina - 1).subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
     })
    } else {
     this.usuarioService.getUsuarioPage(pagina - 1).subscribe(data => {
      this.usuarios = data.content;
      this.total = data.totalElements;
     })
    }
  }
  imprimeRelatorio(){
    return this.usuarioService.downloadPdf();
  }
}
