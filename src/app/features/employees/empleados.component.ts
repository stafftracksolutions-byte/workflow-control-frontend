// features/employees/empleados.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from '../../core/services/empleados.service';
import { Empleado } from '../../models/empleado.model';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];  // array para almacenar los empleados

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    // Traer todos los empleados desde el backend
    this.empleadosService.list().subscribe({
      next: (res: any) => {
        this.empleados = res.data;
        console.log('Empleados:', this.empleados);
      },
      error: (err) => {
        console.error('Error cargando empleados', err);
      }
    });
  }
}