export interface Educacion {
    id?: number;
    schoolName: string;
    title: string;
    logo: string;
    startDate: Date;
    endDate: Date;
    typeOfSchool: string;
    studiesStatus: string;
    educationDescription: string;
    currentEducation: Boolean;
    persona?: number;
}