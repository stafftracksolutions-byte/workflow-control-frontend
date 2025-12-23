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
    <div class="login-container">
      <h2>Login</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <div>
          <label for="correo">Correo</label>
          <input id="correo" formControlName="correo" />
        </div>
        <div>
          <label for="password">Contraseña</label>
          <input id="password" type="password" formControlName="password" />
        </div>
        <div>
          <button type="submit" [disabled]="form.invalid || loading">Entrar</button>
        </div>
        <div *ngIf="error" class="error">{{ error }}</div>
      </form>
    </div>
  `,
  styles: [`
    .login-container { max-width:420px; margin: 48px auto; padding: 16px; border: 1px solid #ddd; border-radius: 8px; }
    .error { color: #c00; margin-top: 8px; }
  `]
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
      next: (user) => {
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
