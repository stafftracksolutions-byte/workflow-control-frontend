import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { EmpleadosService } from '../../core/services/empleados.service';
import { Empleado } from '../../models/empleado.model';

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
    private router: Router
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

}