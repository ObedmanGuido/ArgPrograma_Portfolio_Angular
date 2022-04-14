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
    address: string;
    dayofbirth: number;
    monthofbirth: string;
    yearofbirth: number;
    skills?: Array<any>;
    educacion?: Array<any>;
    experiencia_laboral?: Array<any>;
    proyecto?: Array<any>;
    usuario?: number;
}