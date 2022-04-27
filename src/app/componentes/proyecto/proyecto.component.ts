import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  proyectoLista:any[] = [{}];
  isShow = true;
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;

  constructor(private proyectoService:ProyectoService, private fb:FormBuilder, private tokenService: TokenService) {
    this.form = this.fb.group({
      projectname: [''],
      creationdate: [''],
      projectdescription: [''],
      projectlink: [''],
      image1: [''],
      image2: [''],
      image3: [''],
      video: ['']
    })
  }

  ngOnInit(): void {
    this.obtenerProyecto();
    this.isAdmin = this.tokenService.isAdmin();
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  setDisplay() {
    this.isShow = false;
  }

  obtenerProyecto(){
    this.proyectoService.obtenerProyecto().subscribe(data => {
      console.log(data);
      this.proyectoLista=data;
    }, error => {
      console.log(error)
    })
  }

  crearProyecto() {
    const proyecto: any = {
      projectname: this.form.get('projectname')?.value,
      creationdate: this.form.get('creationdate')?.value,
      projectdescription: this.form.get('projectdescription')?.value,
      projectlink: this.form.get('projectlink')?.value,
      image1: this.form.get('image1')?.value,
      image2: this.form.get('image2')?.value,
      image3: this.form.get('image3')?.value,
      video: this.form.get('video')?.value
    }

    if(this.id == undefined) {
      this.proyectoService.crearProyecto(proyecto).subscribe(data => {
        this.obtenerProyecto();
        this.form.reset();
      }, error => {
        console.log(error);
      })
    } else {
      proyecto.id = this.id;
      this.proyectoService.actualizarProyecto(this.id, proyecto).subscribe(data => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerProyecto();
      }, error => {
        console.log(error);
      })
    }
  }

  borrarProyecto(id: number) {
    this.proyectoService.borrarProyecto(id).subscribe(data =>{
      this.obtenerProyecto()
    }, error => {
      console.log(error);
    })
  }

  actualizarProyecto(proyecto: any) {
    this.accion = 'Editar proyecto: ' + proyecto.projectname;
    this.id = proyecto.id;
    this.form.patchValue({
      projectname: proyecto.projectname,
      creationdate: proyecto.creationdate,
      projectdescription: proyecto.projectdescription,
      projectlink: proyecto.projectlink,
      image1: proyecto.image1,
      image2: proyecto.image2,
      image3: proyecto.image3,
      video: proyecto.video
    })
  }

  cancelar(){
    this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerProyecto();
  }
}