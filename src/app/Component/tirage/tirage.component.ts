// import { Component, OnInit } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   ReactiveFormsModule
// } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Tirage, CompetitionEquipe, Competition } from '../Models/Tout.Model';
// import { TirageService } from '../../Services/tirage.service';
// import { CompetitionService } from '../../Services/competition.service';

// @Component({
//   selector: 'app-tirage',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './tirage.component.html',
//   styleUrls: ['./tirage.component.css']
// })
// export class TirageComponent implements OnInit {
//   tirageForm!: FormGroup;
//   tirages: Tirage[] = [];
//   competitions: Competition[] = []; // Liste des compétitions
//   equipes: CompetitionEquipe[] = []; // Liste des équipes participant à la compétition sélectionnée

//   constructor(
//     private fb: FormBuilder,
//     private tirageService: TirageService,
//     private competitionService: CompetitionService
//   ) {}

//   ngOnInit(): void {
//     this.initForm();
//     this.loadCompetitions();
//     this.loadTirages();
//   }

//   // Initialisation du formulaire
//   initForm(): void {
//     this.tirageForm = this.fb.group({
//       phase: ['', Validators.required],
//       competition_id: ['', Validators.required],
//       nombre_poules: ['', Validators.required]
//     });
//   }

//   // Charger les tirages
//   loadTirages(): void {
//     this.tirageService.getTirages().subscribe(data => {
//       this.tirages = data;
//     });
//   }

//   // Charger les compétitions
//   loadCompetitions(): void {
//     this.competitionService.getCompetitions().subscribe(data => {
//       this.competitions = data;
//     });
//   }

//  // Charger les équipes dès le début, en utilisant la première compétition si disponible
// loadEquipes(competitionId: number): void {
//   this.competitionService.getEquipesByCompetitionId(competitionId)
//     .subscribe(
//       (data: CompetitionEquipe[]) => {
//         this.equipes = data;
//       },
//       (error: any) => {
//         console.error('Erreur lors de la récupération des équipes:', error);
//       }
//     );

// }


//   // Gestion du changement de compétition sélectionnée
//   onCompetitionChange(): void {
//     const competitionId = this.tirageForm.get('competition_id')?.value;
//     if (competitionId) {
//       this.loadEquipes(competitionId);
//     }
//   }

//   // Lancer un tirage
//   onSubmit(): void {
//     if (this.tirageForm.invalid) {
//       return;
//     }

//     const formValues = this.tirageForm.value;
//     this.tirageService.lancerTirage(formValues).subscribe(
//       response => {
//         console.log('Tirage lancé avec succès', response);
//         alert('Le tirage a été lancé.');
//         this.loadTirages(); // Recharger les tirages après l'ajout
//       },
//       error => {
//         console.error('Erreur lors du lancement du tirage', error);
//       }
//     );
//   }
// }
