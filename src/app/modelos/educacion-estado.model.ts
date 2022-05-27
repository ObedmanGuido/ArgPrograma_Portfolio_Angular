import { Educacion } from "./educacion.model";

export interface EducacionEstado {
    id?: number;
    educationStatus: string;
    educacion?: Educacion[];
}