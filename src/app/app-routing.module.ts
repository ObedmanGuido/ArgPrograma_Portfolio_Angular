import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { NuevoUsuarioComponent } from './componentes/nuevo-usuario/nuevo-usuario.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { GuardGuard } from './servicios/guard.guard';
import { LoginGuardGuard } from './servicios/login-guard.guard';

const routes: Routes = [
  {path:'iniciar-sesion',component:IniciarSesionComponent, canActivate: [LoginGuardGuard]},
  {path:'nuevo-usuario',component:NuevoUsuarioComponent, canActivate: [LoginGuardGuard]},
  {path:'portfolio',component:PortfolioComponent},
  {path:'perfil-usuario',component:PerfilUsuarioComponent, canActivate:[GuardGuard], data: {rolesEsperados: ['admin', 'user']}},
  {path:'',redirectTo:'portfolio',pathMatch:'full'},
  {path:'**',redirectTo:'portfolio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
