import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { EmpleadosService } from '../../core/services/empleados.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  auth = inject(AuthService);
  empleadosService = inject(EmpleadosService);
  router = inject(Router);

  empleado: any = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.empleadosService.me().subscribe({
      next: (resp: any) => {
        this.empleado = resp.data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los datos del perfil';
        this.loading = false;
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
