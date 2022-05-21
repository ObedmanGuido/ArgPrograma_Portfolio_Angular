import { Educacion } from "./educacion.model";
import { ExperienciaLaboral } from "./experiencia-laboral.model";
import { Provincia } from "./provincia.model";
import { Proyecto } from "./proyecto.model";
import { Skill } from "./skill.model";

export interface Persona {
    id?: number;
    name: string;
    surname: string;
    profilePicture: string;
    title: string;
    position: string;
    bannerPicture: string;
    aboutPersona: string;
    dateOfBirth: Date;
    telephone: string;
    email: string;
    skills?: Skill[];
    educacion?: Educacion[];
    experiencia_laboral?: ExperienciaLaboral[];
    proyecto?: Proyecto[];
    usuario?: number;
    provincia?: Provincia;
}