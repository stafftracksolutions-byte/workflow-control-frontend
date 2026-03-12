import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from '../../core/services/empleados.service';
import { Empleado } from '../../models/empleado.model';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {

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

}