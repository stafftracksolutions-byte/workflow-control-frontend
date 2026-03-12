export interface Empleado {
  _id?: string;
  nombres: string;
  apellidos: string;
  tipoDocumento?: string;
  numeroDocumento?: number;
  fechaNacimiento?: Date;
  correo?: string;
  telefono?: string;
  cargo?: string;
  area?: string;
  tipoContrato?: string;
  salario?: number;
  estado?: string;
  fechaIngreso?: Date;
}
