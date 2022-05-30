import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SkillTipo } from 'src/app/modelos/skill-tipo.model';
import { Skill } from 'src/app/modelos/skill.model';
import { SkillsService } from 'src/app/servicios/skills.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})

  export class SkillsComponent implements OnInit {
    skillLista?:Skill[];
    skill:Skill = { id: 0, skillName: '', levelNumber: 0, skillDescription: '', skill_tipo: {id: 0, typeName: ''}, persona: 0 };
    accion = 'Agregar';
    form: FormGroup;
    id: number | undefined;
    authority!:string;
    isAdmin = false;
    skill_tipo:SkillTipo = { id: 0, typeName: '' };
    skill_tipoLista?:SkillTipo[];

    constructor(private skillsService:SkillsService, private fb:FormBuilder, private tokenService: TokenService, private toastr: ToastrService) {
      this.form = this.fb.group({
        skillName: ['',[Validators.required]],
        levelNumber: [0,[Validators.required,Validators.min(0),Validators.max(100)]],
        skillDescription: [''],
        skill_tipo: ['',[Validators.required]]
      })
    }
  
    ngOnInit(): void {
      this.obtenerSkill();
      this.obtenerSkillTipo();
      this.isAdmin = this.tokenService.isAdmin();
    }

    obtenerSkill(){
      this.skillsService.obtenerSkill().subscribe(skill => {
        this.skillLista=skill;
      }, error => {
        console.log(error)
      });
    }

    obtenerMisTipos():string[]{
      let listaNueva: (string)[] = [];
      if(!this.skillLista){
        return listaNueva;
      }
      listaNueva = this.skillLista!.map(skill => {{return skill.skill_tipo!.typeName}});
      return [... new Set(listaNueva)];
    }

    obtenerSkillTipo(){
      this.skillsService.obtenerSkillTipo().subscribe(skill_tipo => {
        this.skill_tipoLista=skill_tipo;
      }, error => {
        console.log(error)
      });
    }
  
    crearSkill() {
      const skill: Skill = {
        skillName: this.form.get('skillName')?.value,
        levelNumber: this.form.get('levelNumber')?.value,
        skillDescription: this.form.get('skillDescription')?.value,
        skill_tipo: this.skill_tipoLista!.find(st=>st.id==this.form.get('skill_tipo')?.value)
      }
  
      if(this.id == undefined) {
        this.skillsService.crearSkill(skill).subscribe(skill => {
          this.obtenerSkill();
          this.toastr.success(skill.skillName, 'Creado skill', { timeOut: 5000, positionClass: 'toast-top-center' });
          this.form.reset();
        }, error => {
          console.log(error);
        })
      } else {
        skill.id = this.id;
        this.toastr.success(skill.skillName, 'Actualizado skill', { timeOut: 5000, positionClass: 'toast-top-center' });
        this.skillsService.actualizarSkill(this.id, skill).subscribe(skill => {
          this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.obtenerSkill();
        }, error => {
          console.log(error);
        })
      }
    }
  
    borrarSkill(id: number) {
      this.skillsService.borrarSkill(id).subscribe(skill =>{
        this.toastr.error('Se eliminó un skill', 'Borrado skill', {timeOut: 5000, positionClass: 'toast-top-center'});
        this.obtenerSkill();
      }, error => {
        console.log(error);
      })
    }
  
    actualizarSkill(skill: Skill) {
      this.accion = 'Editar skill: ' + skill.skillName;
      this.id = skill.id;
      this.form.patchValue({
        skillName: skill.skillName,
        levelNumber: skill.levelNumber,
        skillDescription: skill.skillDescription,
        skill_tipo: skill.skill_tipo?.id
      })
    }
  
    cancelar(){
      this.form.reset();
      this.toastr.error('Se canceló agregar/editar skill', this.accion + ' cancelado', {timeOut: 5000, positionClass: 'toast-top-center'});
      this.accion = 'Agregar';
      this.id = undefined;
      this.obtenerSkill();
    }

    get SkillName(){
      return this.form.get('skillName');
    }
  
    get LevelNumber(){
      return this.form.get('levelNumber');
    }
  
    get SkillDescription(){
      return this.form.get('skillDescription');
    }

    get Skill_tipo(){
      return this.form.get('skill_tipo')
    }
}