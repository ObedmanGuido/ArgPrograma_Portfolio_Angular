export interface ExperienciaLaboral {
    id?: number;
    company: string;
    position: string;
    logo:string;
    startdate: Date;
    enddate: Date;
    workdescription: string;
    currentjob: Boolean;
    persona?:number;
}