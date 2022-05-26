import { EducacionTipo } from "./educacion-tipo.model";

export interface Educacion {
    id?: number;
    schoolName: string;
    title: string;
    logo: string;
    startDate: Date;
    endDate: Date;
    studiesStatus: string;
    educationDescription: string;
    currentEducation: Boolean;
    educacion_tipo?: EducacionTipo;
    persona?: number;
}