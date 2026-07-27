import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { EmpleadosService } from '../../core/services/empleados.service';
import { Empleado } from '../../models/empleado.model';
import { AuthService } from '../../core/services/auth.service'; // 🔹 Importar AuthService

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router,
    public authService: AuthService // 🔹 Inyectar AuthService y hacerlo público
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadosService.list().subscribe({
      next: (res: any) => {
        this.empleados = res.data;
        console.log('Empleados:', this.empleados);
      },
      error: (err: any) => {
        console.error('Error cargando empleados', err);
      }
    });
  }

  verEmpleado(id: string) {
    this.router.navigate(['/empleados/ver', id]);
  }

  editarEmpleado(id: string) {
    this.router.navigate(['/empleados/editar', id]);
  }

  eliminarEmpleado(id: string) {
    const confirmar = confirm("¿Desea eliminar este empleado?");
    if (confirmar) {
      this.empleadosService.delete(id).subscribe({
        next: () => {
          console.log('Empleado eliminado');
          this.cargarEmpleados(); // refresca la tabla
        },
        error: (err) => {
          console.error('Error eliminando empleado', err);
        }
      });
    }
  }

  // 🔹 Nuevo: eliminar todos los empleados (solo superadmin)
  deleteAllEmpleados(): void {
    const confirmar = confirm("⚠️ ¿Desea eliminar TODOS los empleados? Esta acción no se puede deshacer.");
    if (confirmar) {
      this.empleadosService.deleteAll().subscribe({
        next: () => {
          console.log('Todos los empleados eliminados');
          this.empleados = []; // limpia la tabla en frontend
        },
        error: (err) => {
          console.error('Error eliminando todos los empleados', err);
        }
      });
    }
  }
}
