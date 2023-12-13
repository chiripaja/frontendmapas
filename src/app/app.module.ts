import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './layout/nav/nav.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { ListaUsuarioComponent } from './usuarios/lista-usuario/lista-usuario.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { FormularioUsuarioComponent } from './usuarios/formulario-usuario/formulario-usuario.component';
import { AdminComponent } from './layout/admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './utils/card/card.component';
import { PobladosmapaComponent } from './poblado/pobladosmapa/pobladosmapa.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { PobladoinfoComponent } from './poblado/pobladoinfo/pobladoinfo.component';
import { ListaPobladoComponent } from './poblado/lista-poblado/lista-poblado.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ListadoEncuestaComponent } from './encuesta/listado-encuesta/listado-encuesta.component';
import { ReporteEncuestaComponent } from './encuesta/reporte-encuesta/reporte-encuesta.component';
import { ListadoProyectoComponent } from './proyectos/listado-proyecto/listado-proyecto.component';
import { CrearProyectoComponent } from './proyectos/crear-proyecto/crear-proyecto.component';
import { ProyectoDetalleCrearComponent } from './proyectos/proyecto-detalle-crear/proyecto-detalle-crear.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    ListaUsuarioComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    FormularioUsuarioComponent,
    AdminComponent,
    CardComponent,
    PobladosmapaComponent,
    PobladoinfoComponent,
    ListaPobladoComponent,
    ListadoEncuestaComponent,
    ReporteEncuestaComponent,
    ListadoProyectoComponent,
    CrearProyectoComponent,
    ProyectoDetalleCrearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
