export interface ExperienciaLaboral {
    id?: number;
    company: string;
    position: string;
    logo:string;
    startDate: Date;
    endDate: Date;
    workDescription: string;
    currentJob: Boolean;
    persona?:number;
}