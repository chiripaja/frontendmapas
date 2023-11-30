import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaUsuarioComponent } from './usuarios/lista-usuario/lista-usuario.component';
import { AdminComponent } from './layout/admin/admin.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { PobladosmapaComponent } from './poblado/pobladosmapa/pobladosmapa.component';
import { ListaPobladoComponent } from './poblado/lista-poblado/lista-poblado.component';
import { authenticateGuard } from './guards/authenticate.guard';
import { logeatedGuard } from './guards/logeated.guard';


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [logeatedGuard] },
  { path: 'usuariossss', component: ListaUsuarioComponent },
  {
    path: 'admin', component: AdminComponent, canActivateChild: [authenticateGuard],
    children: [
      { path: '', redirectTo: 'usuario', pathMatch: 'full' },
      { path: 'usuario', component: ListaUsuarioComponent },
      { path: 'crear', component: CrearUsuarioComponent },
      { path: 'editar/:id', component: EditarUsuarioComponent },
      { path: 'Mapa', component: PobladosmapaComponent },
      { path: 'poblados', component: ListaPobladoComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
