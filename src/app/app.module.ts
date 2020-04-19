import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { UsuarioAddComponent } from './component/usuario-add/usuario-add/usuario-add.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxCurrencyModule} from 'ngx-currency';
export const appRouters: Routes = [
  {
    path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'usuario/list', component: UsuarioComponent, canActivate: [GuardiaoGuard]
  },
  {
    path: 'usuario/add', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]
  },
  {
    path: 'usuario/add/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);
export const optionMask: Partial<IConfig> | (() => Partial<IConfig>) = {};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionMask),
    NgxPaginationModule,
    NgbModule.forRoot(),
    NgxCurrencyModule
  ],
  providers: [NgbModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
