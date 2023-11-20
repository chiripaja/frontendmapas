import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListaUsuarioComponent } from './usuarios/lista-usuario/lista-usuario.component';
import { AdminComponent } from './layout/admin/admin.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { FormularioUsuarioComponent } from './usuarios/formulario-usuario/formulario-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { PobladosmapaComponent } from './poblado/pobladosmapa/pobladosmapa.component';
import { esAdminGuard } from './es-admin.guard';
import { PruebamapaComponent } from './poblado/pruebamapa/pruebamapa.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'usuariossss', component: ListaUsuarioComponent },
  {
    path: 'admin', component: AdminComponent, 
    children: [
      { path: '', redirectTo: 'usuario', pathMatch: 'full' },
      { path: 'usuario', component: ListaUsuarioComponent },
      { path: 'crear', component: CrearUsuarioComponent },
      { path: 'editar/:id', component: EditarUsuarioComponent },
      { path: 'poblado', component: PobladosmapaComponent },
      { path: 'pobladoprueba', component: PruebamapaComponent },
    ]
  },

  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
