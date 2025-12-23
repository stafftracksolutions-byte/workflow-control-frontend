import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthUser {
  id: string;
  rol: 'superadmin' | 'admin' | 'empleado';
  token: string;
  nombre?: string;
  correo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  private currentUserSub = new BehaviorSubject<AuthUser | null>(this.readLocalUser());
  currentUser$ = this.currentUserSub.asObservable();

  constructor(private http: HttpClient) {}

  // 🔐 LOGIN (FIXED)
  login(correo: string, password: string): Observable<AuthUser> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { correo, password })
      .pipe(
        map(resp => {
          const decoded = this.decodeToken(resp.token);

          const user: AuthUser = {
            id: decoded.id,
            rol: decoded.rol,
            token: resp.token,
            nombre: decoded.nombre,
            correo: decoded.correo
          };

          this.saveLocalUser(user);
          this.currentUserSub.next(user);
          return user;
        })
      );
  }

  // 🔑 Usado por interceptor
  getToken(): string | null {
    return this.currentUserSub.value?.token ?? null;
  }

  // 👤 Usuario actual
  get user(): AuthUser | null {
    return this.currentUserSub.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.currentUserSub.next(null);
  }

  // 🔐 Decode JWT (SIN LIBRERÍAS)
  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  // 💾 Storage helpers
  private saveLocalUser(user: AuthUser): void {
    localStorage.setItem('auth', JSON.stringify(user));
  }

  private readLocalUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem('auth');
      return raw ? JSON.parse(raw) as AuthUser : null;
    } catch {
      return null;
    }
  }
}
