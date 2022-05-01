import { Educacion } from "./educacion.model";
import { ExperienciaLaboral } from "./experiencia-laboral.model";

export interface Persona {
    id?: number;
    name: string;
    surname: string;
    profilepicture: string;
    title: string;
    position: string;
    bannerpicture: string;
    aboutpersona: string;
    address: string;
    dateofbirth: Date;
    telephone: string;
    email: string;
    skills?: Array<any>;
    educacion?: Educacion[];
    experiencia_laboral?: ExperienciaLaboral[];
    proyecto?: Array<any>;
    usuario?: number;
}