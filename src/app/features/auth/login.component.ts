import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="container d-flex justify-content-center align-items-center vh-100">
      <div class="card shadow-lg p-4" style="max-width: 420px; width: 100%;">
        <h2 class="text-center mb-4">🔐 Iniciar Sesión</h2>
        <form [formGroup]="form" (ngSubmit)="submit()">
          
          <!-- Correo -->
          <div class="mb-3">
            <label for="correo" class="form-label">Correo electrónico</label>
            <input id="correo" type="email" class="form-control" formControlName="correo" placeholder="ejemplo@correo.com">
            <div *ngIf="form.get('correo')?.invalid && form.get('correo')?.touched" class="text-danger small">
              Ingrese un correo válido.
            </div>
          </div>

          <!-- Contraseña -->
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input id="password" type="password" class="form-control" formControlName="password" placeholder="********">
            <div *ngIf="form.get('password')?.invalid && form.get('password')?.touched" class="text-danger small">
              La contraseña es obligatoria.
            </div>
          </div>

          <!-- Botón -->
          <div class="d-grid">
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid || loading">
              {{ loading ? 'Entrando...' : 'Entrar' }}
            </button>
          </div>

          <!-- Error -->
          <div *ngIf="error" class="alert alert-danger mt-3">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  loading = false;
  error: string | null = null;

  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;

    const correo = this.form.value.correo ?? '';
    const password = this.form.value.password ?? '';

    this.auth.login(correo, password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message ?? 'Error en inicio de sesión';
      }
    });
  }
}