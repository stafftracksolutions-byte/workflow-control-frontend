import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from '../../../core/services/empleados.service';
import { Empleado } from '../../../models/empleado.model';

@Component({
  selector: 'app-ver-empleado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css']
})
export class VerEmpleadoComponent implements OnInit {

  empleado!: Empleado;

  constructor(
    private route: ActivatedRoute,
    private empleadosService: EmpleadosService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.empleadosService.getById(id).subscribe((res: any) => {
        this.empleado = res.data;
      });
    }

  }

}