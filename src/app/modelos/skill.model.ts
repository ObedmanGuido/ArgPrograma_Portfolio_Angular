import { SkillTipo } from "./skill-tipo.model";

export interface Skill {
    id?: number;
    skillname: string;
    levelnumber: number;
    skilldescription: string;
    skill_tipo?: SkillTipo;
    persona?: number;
}