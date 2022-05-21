import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/modelos/proyecto.model';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  proyectoLista?:Proyecto[];
  proyecto:Proyecto = { id: 0, projectName: '', creationDate: new(Date), projectDescription: '',
    projectLink: '', image1: '', image2: '', image3: '', video: '', persona: 0 };
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;

  constructor(private proyectoService:ProyectoService, private fb:FormBuilder, private tokenService: TokenService) {
    this.form = this.fb.group({
      projectName: ['',[Validators.required]],
      creationDate: ['',[Validators.required]],
      projectDescription: ['',[Validators.required]],
      projectLink: ['',[Validators.required]],
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

  obtenerProyecto(){
    this.proyectoService.obtenerProyecto().subscribe(proyecto => {
      this.proyectoLista=proyecto;
    }, error => {
      console.log(error)
    })
  }

  crearProyecto() {
    const proyecto: Proyecto = {
      projectName: this.form.get('projectName')?.value,
      creationDate: this.form.get('creationDate')?.value,
      projectDescription: this.form.get('projectDescription')?.value,
      projectLink: this.form.get('projectLink')?.value,
      image1: this.form.get('image1')?.value,
      image2: this.form.get('image2')?.value,
      image3: this.form.get('image3')?.value,
      video: this.form.get('video')?.value
    }

    if(this.id == undefined) {
      this.proyectoService.crearProyecto(proyecto).subscribe(proyecto => {
        this.obtenerProyecto();
        this.form.reset();
      }, error => {
        console.log(error);
      })
    } else {
      proyecto.id = this.id;
      this.proyectoService.actualizarProyecto(this.id, proyecto).subscribe(proyecto => {
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
    this.proyectoService.borrarProyecto(id).subscribe(proyecto =>{
      this.obtenerProyecto()
    }, error => {
      console.log(error);
    })
  }

  actualizarProyecto(proyecto: Proyecto) {
    this.accion = 'Editar proyecto: ' + proyecto.projectName;
    this.id = proyecto.id;
    this.form.patchValue({
      projectName: proyecto.projectName,
      creationDate: proyecto.creationDate,
      projectDescription: proyecto.projectDescription,
      projectLink: proyecto.projectLink,
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

  get ProjectName(){
    return this.form.get('projectName');
  }

  get CreationDate(){
    return this.form.get('creationDate');
  }

  get ProjectDescription(){
    return this.form.get('projectDescription');
  }

  get ProjectLink(){
    return this.form.get('projectLink');
  }
}