import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../core/services/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent {

  constructor(
    private fb: FormBuilder,
    private empleadosService: EmpleadosService,
    private router: Router
  ) {}

  empleadoForm = this.fb.group({

    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],

    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', Validators.required],

    fechaNacimiento: ['', Validators.required],

    correo: ['', [Validators.required, Validators.email]],

    telefono: [''],

    cargo: [''],

    area: [''],

    fechaIngreso: [''],

    tipoContrato: [''],

    salario: [''],

    estado: ['Activo']

  });


  crearEmpleado() {

    if (this.empleadoForm.invalid) {
      alert("Complete los campos obligatorios");
      return;
    }

    const data = this.empleadoForm.value as any;

    this.empleadosService.create(data)
      .subscribe({
        next: () => {

          alert("Empleado creado correctamente");

          this.router.navigate(['/empleados']);

        },
        error: (err) => {
          console.error(err);
          alert("Error creando empleado");
        }
      });

  }

}