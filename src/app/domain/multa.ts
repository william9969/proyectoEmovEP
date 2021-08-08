import { Usuario } from "./usuario";

export class Multa {
    uid: string;
    placa: string;
    fecha: Date;
    direccion: string;
    descripcion: string;
    pago: string;
    imagen: string;
    usuario: Usuario;
}