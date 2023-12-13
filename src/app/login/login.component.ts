import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Icredenciales } from '../interfaces/icredenciales';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  authservices = inject(AuthService)
  router = inject(Router)
  fb = inject(FormBuilder)

  form = this.fb.group({
    usuario: ['', Validators.required],
    password: ['', Validators.required]
  })

  obtenerErrorCampoNombre(camponom: string) {
    var campo = this.form.get(camponom)

    if (campo?.hasError('required')) {
      return 'El campo es requerido';
    }
    return ''
  }

  onSubmit(credenciales: Icredenciales) {
    this.authservices.login(credenciales).subscribe(data => {

      this.authservices.guardarToken(data)
      this.router.navigate(['/admin/Mapa'])
    },
      (error) => {
        this.form.reset();
        let timerInterval;
        Swal.fire({
          icon: "error",
          html: "Se cerrara automaticamente en <b></b> millisegundos.",
          title: "Usuario y/o contraseña incorrecta.",
          timer:3000,
          timerProgressBar: true,
          text: error.error.message,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup()?.querySelector("b")!;
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
        })
      }
    )
  }
}
