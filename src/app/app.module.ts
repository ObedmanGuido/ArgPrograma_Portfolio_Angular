import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExperienciaLaboralComponent } from './componentes/experiencia-laboral/experiencia-laboral.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonaComponent } from './componentes/persona/persona.component';
import { NuevoUsuarioComponent } from './componentes/nuevo-usuario/nuevo-usuario.component';
import { FormsModule } from '@angular/forms';
import { interceptorProvider } from './servicios/interceptor.service';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { ToastrModule } from 'ngx-toastr';
import { ProyectoComponent } from './componentes/proyecto/proyecto.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsAr, 'es-Ar');


@NgModule({
  declarations: [
    AppComponent,
    ExperienciaLaboralComponent,
    EducacionComponent,
    HeaderComponent,
    FooterComponent,
    IniciarSesionComponent,
    PortfolioComponent,
    SkillsComponent,
    PersonaComponent,
    NuevoUsuarioComponent,
    PerfilUsuarioComponent,
    ProyectoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    YouTubePlayerModule
  ],
  providers: [interceptorProvider, { provide: LOCALE_ID, useValue: 'es-Ar' }],
  bootstrap: [AppComponent]
})
export class AppModule { }