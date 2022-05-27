import { EducacionEstado } from "./educacion-estado.model";
import { EducacionTipo } from "./educacion-tipo.model";

export interface Educacion {
    id?: number;
    schoolName: string;
    title: string;
    logo: string;
    startDate: Date;
    endDate: Date;
    educationDescription: string;
    currentEducation: Boolean;
    educacion_tipo?: EducacionTipo;
    educacion_estado?: EducacionEstado;
    persona?: number;
}