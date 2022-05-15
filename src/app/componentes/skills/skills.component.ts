import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillTipo } from 'src/app/modelos/skill-tipo.model';
import { Skill } from 'src/app/modelos/skill.model';
import { SkillsService } from 'src/app/servicios/skills.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
/*export class SkillsComponent implements OnInit {
  skillsList:any;
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.skillsList=data.skill;
    })
  } Versión previa usando un JSON.*/
  export class SkillsComponent implements OnInit {
    skillLista?:Skill[];
    skill:Skill = { id: 0, skillname: '', levelnumber: 0, skilldescription: '', skill_tipo: {id: 0, typename: ''}, persona: 0 };
    accion = 'Agregar';
    form: FormGroup;
    id: number | undefined;
    authority!:string;
    isAdmin = false;
    skill_tipo:SkillTipo = { id: 0, typename: '' };
    skill_tipoLista?:SkillTipo[];

    constructor(private skillsService:SkillsService, private fb:FormBuilder, private tokenService: TokenService) {
      this.form = this.fb.group({
        skillname: ['',[Validators.required]],
        levelnumber: [0,[Validators.required,Validators.min(0),Validators.max(100)]],
        skilldescription: [''],
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
        console.log(skill);
        this.skillLista=skill;
      }, error => {
        console.log(error)
      });
    }

    obtenerSkillTipo(){
      this.skillsService.obtenerSkillTipo().subscribe(skill_tipo => {
        console.log(skill_tipo);
        this.skill_tipoLista=skill_tipo;
      }, error => {
        console.log(error)
      });
    }
  
    crearSkill() {
      const skill: Skill = {
        skillname: this.form.get('skillname')?.value,
        levelnumber: this.form.get('levelnumber')?.value,
        skilldescription: this.form.get('skilldescription')?.value,
        skill_tipo: this.skill_tipoLista!.find(st=>st.id==this.form.get('skill_tipo')?.value)
      }
  
      if(this.id == undefined) {
        this.skillsService.crearSkill(skill).subscribe(skill => {
          this.obtenerSkill();
          this.form.reset();
        }, error => {
          console.log(error);
        })
      } else {
        skill.id = this.id;
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
        this.obtenerSkill()
      }, error => {
        console.log(error);
      })
    }
  
    actualizarSkill(skill: Skill) {
      this.accion = 'Editar skill: ' + skill.skillname;
      this.id = skill.id;
      this.form.patchValue({
        skillname: skill.skillname,
        levelnumber: skill.levelnumber,
        skilldescription: skill.skilldescription,
        skill_tipo: skill.skill_tipo?.id
      })
    }
  
    cancelar(){
      this.form.reset();
          this.accion = 'Agregar';
          this.id = undefined;
          this.obtenerSkill();
    }

    get Skillname(){
      return this.form.get('skillname');
    }
  
    get Levelnumber(){
      return this.form.get('levelnumber');
    }
  
    get Skilldescription(){
      return this.form.get('skilldescription');
    }

    get Skill_tipo(){
      return this.form.get('skill_tipo')
    }
}