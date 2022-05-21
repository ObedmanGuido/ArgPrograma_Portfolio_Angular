import { Skill } from "./skill.model";

export interface SkillTipo {
    id?: number;
    typeName: string;
    skill?: Skill[];
}