export interface Persona {
    id?: number;
    fullname: string;
    name: string;
    surname: string;
    profilepicture: string;
    title: string;
    position: string;
    bannerpicture: string;
    aboutpersona: string;
    skills?: Array<any>;
    educacion?: Array<any>;
    experiencia_laboral?: Array<any>;
    usuario?: number;
}