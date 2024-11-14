import { Routes } from '@angular/router'
import { AdminDashboardComponent } from './Component/admin-dashboard/admin-dashboard.component'
// import { ZoneDashboardComponent } from './Component/zone-dashboard/zone-dashboard.component'
import { EquipeDashboardComponent } from './Component/equipe-dashboard/equipe-dashboard.component'
// import { LoginComponent } from './Component/login/login.component'
import { UserManagementComponent } from './Component/user-management/user-management.component'
// import { TirageComponent } from './Component/tirage/tirage.component'
import { AcceuilComponent } from './Component/acceuil/acceuil.component'
// import { MatcheComponent } from './Component/matche/matche.component'
import { ZoneDashboardComponent } from './Component/zone-dashboard/zone-dashboard.component'
import { NotFoundComponent } from './Component/not-found/not-found.component'
import { ConnexionComponent } from './Component/connexion/connexion.component'
import {  InscriptionZoneComponent } from './Component/inscriptionZone/inscription.component'
import { InscriptionEquipeComponent } from './Component/inscriptionEquipe/inscription.component'
import { CompetitionComponent } from './Component/Competitions/competition_form/competition_form.component'
import { GalerieComponent } from './Component/galerie/galerie.component'
import { JoueurComponent } from './Component/joueur/joueur.component';
import { ArticleListComponent } from './articles/article-list/article-list.component'
import { ArticleFormComponent } from './articles/article-form/article-form.component'
import { ArticleDetailsComponent } from './articles/article-details/article-details.component'

// import { EquipeListComponent } from './Component/equipe-list/equipe-list.component'




export const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'ajout/zone', component: InscriptionZoneComponent },
  { path: 'ajout/equipe', component: InscriptionEquipeComponent },
  { path: 'galerie', component: GalerieComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'zones', component: ZoneDashboardComponent },
  { path: 'equipe-dashboard', component: EquipeDashboardComponent },
  { path: 'users', component: UserManagementComponent },
  {path: 'joueur', component: JoueurComponent},
  
  
   { path: 'articles', component: ArticleListComponent },
  { path: 'articles/create', component: ArticleFormComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  { path: 'articles/edit/:id', component: ArticleFormComponent },
  
  // { path: 'matches', component: MatcheComponent },
  // { path: 'tirages', component: TirageComponent },
  // { path: 'tirages/lancer', component: TirageComponent },
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' }, 
  { path: 'acceuil', component: AcceuilComponent }, // Ensure this path and component are correct
  { path: 'competitions',component: CompetitionComponent },
  { path: '**', component: NotFoundComponent } 


]
