export interface Empleado {
  _id?: string;
  nombres: string;
  apellidos: string;
  tipoDocumento?: string;
  numeroDocumento?: number;
  fechaNacimiento?: string;
  correo?: string;
  telefono?: string;
  cargo?: string;
  area?: string;
  tipoContrato?: string;
  salario?: number;
  estado?: string;
  fechaIngreso?: string;
}
