import { SkillTipo } from "./skill-tipo.model";

export interface Skill {
    id?: number;
    skillName: string;
    levelNumber: number;
    skillDescription: string;
    skill_tipo?: SkillTipo;
    persona?: number;
}