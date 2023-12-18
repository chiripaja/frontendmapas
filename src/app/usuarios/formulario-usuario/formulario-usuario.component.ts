import { Component,EventEmitter,OnInit, Output,Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUsuario } from 'src/app/interfaces/iusuario';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit{
  @Input() modelo?:IUsuario;
  @Output() datosFormulario=new EventEmitter<IUsuario>();
  ngOnInit(): void {    
      if(this.modelo!==undefined){     
        this.form.patchValue(this.modelo)
      }    
  }
  form=this.fb.group({
    usuario:['',Validators.required],
    password:['',Validators.required],
    nombre:['',Validators.required]
  })

  constructor(private fb:FormBuilder) {  

  }


  GuardarCambios(){
    this.datosFormulario.emit(this.form.value)
  
  }
  resetFormulario() {
    this.form.reset();
  }
}
