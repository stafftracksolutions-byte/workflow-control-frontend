import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 👤 Mis datos como empleado
  getMisDatos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/empleados/me`);
  }
}

export class EmpleadosComponent {
}
