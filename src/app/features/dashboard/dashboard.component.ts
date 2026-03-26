import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { EmpleadosService } from '../../core/services/empleados.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private auth = inject(AuthService);
  private router = inject(Router);
  private empleadosService = inject(EmpleadosService);

  user = this.auth.user;

  empleado: any = null;
  cargando = true;
  error = false;

  ngOnInit(): void {

    // Suscripción al usuario autenticado
    this.auth.currentUser$.subscribe(u => {
      this.user = u;
    });

    // Solo cargar datos si es empleado
    if (this.user?.rol === 'empleado') {
      this.cargarEmpleado();
    }
  }

  private cargarEmpleado(): void {
    this.empleadosService.me().subscribe({
      next: (resp: any) => {
        this.empleado = resp.data; // ✅ Corrección clave
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}