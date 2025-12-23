import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empleado } from '../../models/empleado.model';
import { environment } from '../../../environments/environment';
//'../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private api = environment.apiUrl + '/empleados';

  constructor(private http: HttpClient) {}

  list(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.api);
  }

  getById(id: string) {
    return this.http.get<Empleado>(`${this.api}/${id}`);
  }

  create(payload: Partial<Empleado>) {
    return this.http.post<Empleado>(this.api, payload);
  }

  update(id: string, payload: Partial<Empleado>) {
    return this.http.put<Empleado>(`${this.api}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  me() {
    return this.http.get<Empleado>(`${this.api}/me`);
  }
}
