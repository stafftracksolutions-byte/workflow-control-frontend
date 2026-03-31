import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { MainLayoutComponent } from './layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then(m => m.LoginComponent)
  },
  
  {
    path: 'asistencias',
    loadComponent: () =>
      import('./features/assists/asistencias.component').then(m => m.AsistenciasComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'reportes',
    loadComponent: () =>
      import('./features/reports/reportes.component').then(m => m.ReportesComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'configuracion',
    loadComponent: () =>
      import('./features/settings/configuracion.component').then(m => m.ConfiguracionComponent),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'no-autorizado',
    loadComponent: () =>
      import('./shared/no-autorizado/no-autorizado.component')
        .then(m => m.NoAutorizadoComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
      },
      {
    path: 'perfil',
    loadComponent: () =>
      import('./features/profile/perfil.component').then(m => m.PerfilComponent),
    canActivate: [roleGuard(['empleado', 'admin', 'superadmin'])]
  },
      {
  path: 'dashboard',
  loadComponent: () =>
    import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
  canActivate: [AuthGuard]
  },
  {
    path: 'empleados',
    loadComponent: () =>
      import('./features/employees/empleados.component').then(m => m.EmpleadosComponent),
    canActivate: [roleGuard(['admin', 'superadmin'])]
  }
    ]
  },
  {
  path: 'empleados/crear',
  loadComponent: () =>
    import('./features/employees/crear-empleado/crear-empleado.component')
      .then(m => m.CrearEmpleadoComponent),
  canActivate: [roleGuard(['admin','superadmin'])]
  },
  {
  path: 'empleados/ver/:id',
  loadComponent: () =>
    import('./features/employees/ver-empleado/ver-empleado.component')
      .then(m => m.VerEmpleadoComponent)
},
{
  path: 'empleados/editar/:id',
  loadComponent: () =>
    import('./features/employees/crear-empleado/crear-empleado.component')
      .then(m => m.CrearEmpleadoComponent), // o EditarEmpleadoComponent si lo tienes separado
  canActivate: [roleGuard(['admin','superadmin'])]
},

  {
    path: '**',
    redirectTo: 'login'
  }
  
];
