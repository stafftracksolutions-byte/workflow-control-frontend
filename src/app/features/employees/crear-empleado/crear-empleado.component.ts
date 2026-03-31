import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpleadosService } from '../../../core/services/empleados.service';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-empleado.component.html',
  styleUrls: ['./crear-empleado.component.css']
})
export class CrearEmpleadoComponent implements OnInit {

  modo: 'crear' | 'editar' = 'crear';
  empleadoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private empleadosService: EmpleadosService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit(): void {
    this.empleadoId = this.route.snapshot.paramMap.get('id');
    if (this.empleadoId) {
      this.modo = 'editar';

      // Traer datos del empleado y precargar formulario
      this.empleadosService.getById(this.empleadoId).subscribe({
        next: (res: any) => {
          const empleado = res.data; // 👈 igual que en VerEmpleado
          console.log('Empleado cargado:', empleado);

          this.empleadoForm.patchValue({
            nombres: empleado.nombres,
            apellidos: empleado.apellidos,
            tipoDocumento: empleado.tipoDocumento,
            numeroDocumento: empleado.numeroDocumento ? empleado.numeroDocumento.toString() : '',
            fechaNacimiento: empleado.fechaNacimiento ? this.formatDate(empleado.fechaNacimiento) : '',
            correo: empleado.correo,
            telefono: empleado.telefono,
            cargo: empleado.cargo,
            area: empleado.area,
            fechaIngreso: empleado.fechaIngreso ? this.formatDate(empleado.fechaIngreso) : '',
            tipoContrato: empleado.tipoContrato,
            salario: empleado.salario ? empleado.salario.toString() : '',
            estado: empleado.estado
          });
        },
        error: (err) => {
          console.error(err);
          alert("Error cargando datos del empleado");
        }
      });
    }
  }

  crearEmpleado() {
    if (this.empleadoForm.invalid) {
      alert("Complete los campos obligatorios");
      return;
    }

    const data = this.empleadoForm.value as any;

    if (this.modo === 'crear') {
      this.empleadosService.create(data).subscribe({
        next: () => {
          alert("Empleado creado correctamente");
          this.router.navigate(['/empleados']);
        },
        error: (err) => {
          console.error(err);
          alert("Error creando empleado");
        }
      });
    } else {
      this.empleadosService.update(this.empleadoId!, data).subscribe({
        next: () => {
          alert("Empleado actualizado correctamente");
          this.router.navigate(['/empleados']);
        },
        error: (err) => {
          console.error(err);
          alert("Error actualizando empleado");
        }
      });
    }
  }

  // 🔧 Conversión de fechas a formato YYYY-MM-DD para inputs type="date"
  private formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}