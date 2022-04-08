export class JwtDTO {
    token!: string;
    type!: string;
    username!: string;
    authorities!: string[];
    //Sin signo de exclamación hay error.
}
