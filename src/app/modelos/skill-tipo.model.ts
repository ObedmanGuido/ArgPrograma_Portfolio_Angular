import { Skill } from "./skill.model";

export interface SkillTipo {
    id?: number;
    typename: string;
    skill?: Skill[];
}