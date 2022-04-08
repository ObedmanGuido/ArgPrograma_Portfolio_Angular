export class NuevoUsuario {
    nombre!: string;
    username!: string;
    email!: string;
    password!: string;
    //Sin signo de exclamación hay error.

    constructor(nombre: string, username: string, email: string, password: string) {
        this.nombre = nombre;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
