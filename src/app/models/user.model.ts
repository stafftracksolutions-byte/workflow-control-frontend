export interface User {
  _id?: string;
  nombre?: string;
  apellido?: string;
  correo: string;
  rol?: 'superadmin' | 'admin' | 'empleado' | string;
  token?: string;
}
