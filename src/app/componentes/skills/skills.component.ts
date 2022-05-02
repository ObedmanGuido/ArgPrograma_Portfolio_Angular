import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    skill:Skill = { id: 0, skillname: '', levelname: '', levelnumber: 0, skilltype: '', skilldescription: '', persona: 0 }
    isShow = true;
    accion = 'Agregar';
    form: FormGroup;
    id: number | undefined;
    authority!:string;
    isAdmin = false;

    constructor(private skillsService:SkillsService, private fb:FormBuilder, private tokenService: TokenService) {
      this.form = this.fb.group({
        skillname: ['',[Validators.required]],
        levelname:['',[Validators.required]],
        levelnumber: [0,[Validators.required,Validators.min(0),Validators.max(100)]],
        skilltype: ['',[Validators.required]],
        skilldescription: ['']
      })
    }
  
    ngOnInit(): void {
      this.obtenerSkill();
      this.isAdmin = this.tokenService.isAdmin();
    }
  
    toggleDisplay() {
      this.isShow = !this.isShow;
    }
  
    setDisplay() {
      this.isShow = false;
    }
  
    obtenerSkill(){
      this.skillsService.obtenerSkill().subscribe(skill => {
        console.log(skill);
        this.skillLista=skill;
      }, error => {
        console.log(error)
      })
    }
  
    crearSkill() {
      const skill: Skill = {
        skillname: this.form.get('skillname')?.value,
        levelname: this.form.get('levelname')?.value,
        levelnumber: this.form.get('levelnumber')?.value,
        skilltype: this.form.get('skilltype')?.value,
        skilldescription: this.form.get('skilldescription')?.value
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
        levelname: skill.levelname,
        levelnumber: skill.levelnumber,
        skilltype: skill.skilltype,
        skilldescription: skill.skilldescription
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
  
    get Levelname(){
      return this.form.get('levelname');
    }
  
    get Levelnumber(){
      return this.form.get('levelnumber');
    }
  
    get Skilltype(){
      return this.form.get('skilltype');
    }
}