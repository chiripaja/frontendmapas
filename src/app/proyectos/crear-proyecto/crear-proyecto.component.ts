import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardLgImage } from '@angular/material/card';
import { Router } from '@angular/router';
import { Iproyecto } from 'src/app/interfaces/iproyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.css']
})
export class CrearProyectoComponent {
  router = inject(Router)
  fb = inject(FormBuilder)
  proyectoServices = inject(ProyectoService)
  proyecto?: Iproyecto
  form = this.fb.group({
    nomproyec: ['', Validators.required],
    fechaini: ['', Validators.required],
    fechafin: ['', Validators.required],
    descripcionproyec: ['', Validators.required],
    responsable: ['', Validators.required],
    estado: ['', Validators.required]
  })
  GuardarCambios() {
    if (this.form.value.fechaini && this.form.value.fechafin) {
      const fechaini = new Date(this.form.value.fechaini);
      const fechafin = new Date(this.form.value.fechafin);
      this.proyecto = {
        nomproyec: this.form.value.nomproyec,
        fechaini: new Date(fechaini),
        fechafin: new Date(fechafin),
        descripcionproyec: this.form.value.descripcionproyec,
        responsable: this.form.value.responsable,
        estado: this.form.value.estado,
      };
      this.proyectoServices.create(this.proyecto).subscribe(data=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Modificado Correctamente.',
          showConfirmButton: false,
          timer: 1500
        }).then((data)=>{
          this.router.navigate(['/admin/proyectos'])
        })

      })
    }
  }
}
