import { Educacion } from "./educacion.model";

export interface EducacionTipo {
    id?: number;
    educationType: string;
    educacion?: Educacion[];
}