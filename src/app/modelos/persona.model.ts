import { Educacion } from "./educacion.model";
import { ExperienciaLaboral } from "./experiencia-laboral.model";
import { Provincia } from "./provincia.model";
import { Proyecto } from "./proyecto.model";
import { Skill } from "./skill.model";

export interface Persona {
    id?: number;
    name: string;
    surname: string;
    profilepicture: string;
    title: string;
    position: string;
    bannerpicture: string;
    aboutpersona: string;
    dateofbirth: Date;
    telephone: string;
    email: string;
    skills?: Skill[];
    educacion?: Educacion[];
    experiencia_laboral?: ExperienciaLaboral[];
    proyecto?: Proyecto[];
    usuario?: number;
    provincia?: Provincia;
}