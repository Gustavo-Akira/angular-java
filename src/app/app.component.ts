import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private routes: Router) {}
  public sair(): void  {
    localStorage.clear();
    this.routes.navigate(['login']);
  }
  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.routes.navigate(['login']);
    }
  }
}
