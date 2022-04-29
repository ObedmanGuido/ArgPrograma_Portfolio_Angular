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
    educacion?: Array<any>;
    experiencia_laboral?: Array<any>;
    proyecto?: Array<any>;
    usuario?: number;
}