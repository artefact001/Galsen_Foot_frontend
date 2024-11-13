// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CompetitionService } from '../../Services/competition.service';
// import { Competition } from '../Models/Tout.Model';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-competition',
//   standalone: true,
//   imports: [ ReactiveFormsModule, CommonModule ],
//   templateUrl: './competition.component.html',
//   styleUrls: ['./competition.component.css']
// })
// export class CompetitionComponent implements OnInit {
// onSubmit() {
// throw new Error('Method not implemented.');
// }
//   competitionForm: FormGroup;
//   competitions: Competition[] = [];
//   selectedCompetition: Competition | null = null;
//   equipes: any[] = [];  // Liste des équipes
//   isEditing: boolean = false;
//   submissionSuccess: boolean | null = null;
//   submissionError: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private competitionService: CompetitionService
//   ) {
//     this.competitionForm = this.fb.group({
//       nom: ['', [Validators.required]],
//       date_debut: ['', [Validators.required]],
//       date_fin: ['', [Validators.required]],
//       lieux: ['Dakar']  // Default location
//     });
//   }

//   ngOnInit() {
//     this.loadCompetitions();
//   }

//   loadCompetitions() {
//     this.competitionService.getCompetitions().subscribe((data: Competition[]) => {
//       this.competitions = data;
//     });
//   }

//   viewCompetitionDetails(id: number) {
//     this.competitionService.getCompetitionById(id).subscribe((competition: Competition) => {
//       this.selectedCompetition = competition;
//       this.loadEquipes(id); // Charge les équipes de la compétition
//     });
//   }

//   loadEquipes(competitionId: number) {
//     this.competitionService.getEquipesByCompetitionId(competitionId).subscribe((data: any[]) => {
//       this.equipes = data; // Assurez-vous que cette méthode renvoie les équipes liées à la compétition
//     });
//   }

//   editCompetition(competition: Competition) {
//     this.isEditing = true;
//     this.selectedCompetition = competition;
//     this.competitionForm.patchValue(competition);
//   }

//   saveCompetition() {
//     if (this.competitionForm.valid && this.selectedCompetition) {
//       const updatedData = this.competitionForm.value;
//       this.competitionService
//         .updateCompetition(this.selectedCompetition.id, updatedData)
//         .subscribe(
//           () => {
//             this.submissionSuccess = true;
//             this.isEditing = false;
//             this.selectedCompetition = null;
//             this.loadCompetitions();
//           },
//           (error) => {
//             this.submissionError = 'Error updating competition.';
//             console.error(error);
//           }
//         );
//     }
//   }

//   cancelEdit() {
//     this.isEditing = false;
//     this.selectedCompetition = null;
//     this.competitionForm.reset({ lieux: 'Dakar' });
//   }
// }


// **********

// import { Component, OnInit } from '@angular/core';
// import { CompetitionService } from '../../Services/competition.service';
// import { Competition } from '../Models/Tout.Model';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-competition',
//   standalone: true,
//   imports: [ ReactiveFormsModule, CommonModule ],
//   templateUrl: './competition.component.html',
//   styleUrls: ['./competition.component.css']
// })

// export class CompetitionComponent implements OnInit {
//   competitions: Competition[] = [];
//   selectedCompetition: Competition | null = null;

//   constructor(private competitionService: CompetitionService) {}

//   ngOnInit(): void {
//     this.loadCompetitions();
//   }

//   // Load all competitions
//   loadCompetitions(): void {
//     this.competitionService.getAllCompetitions().subscribe(
//       (data: Competition[]) => this.competitions = data,
//       error => console.error('Error loading competitions:', error)
//     );
//   }

//   // View details of a competition
//   viewCompetition(id: number): void {
//     this.competitionService.getCompetitionById(id).subscribe(
//       (competition: Competition) => this.selectedCompetition = competition,
//       error => console.error('Error fetching competition:', error)
//     );
//   }

//   // Create a new competition
//   createCompetition(data: Partial<Competition>): void {
//     this.competitionService.createCompetition(data).subscribe(
//       (newCompetition: Competition) => {
//         this.competitions.push(newCompetition);
//       },
//       error => console.error('Error creating competition:', error)
//     );
//   }

//   // Update a competition
//   updateCompetition(id: number, data: Partial<Competition>): void {
//     this.competitionService.updateCompetition(id, data).subscribe(
//       (updatedCompetition: Competition) => {
//         const index = this.competitions.findIndex(c => c.id === id);
//         if (index > -1) {
//           this.competitions[index] = updatedCompetition;
//         }
//       },
//       error => console.error('Error updating competition:', error)
//     );
//   }

//   // Delete a competition
//   deleteCompetition(id: number): void {
//     this.competitionService.deleteCompetition(id).subscribe(
//       () => {
//         this.competitions = this.competitions.filter(c => c.id !== id);
//       },
//       error => console.error('Error deleting competition:', error)
//     );
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Competition } from '../Models/Tout.Model';
import { CompetitionService } from '../../Services/competition.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  competitionForm: FormGroup;
  competitions: Competition[] = [];
  selectedCompetition: Competition | null = null;
  submissionSuccess: boolean = false;
  submissionError: string | null = null;

  constructor(private fb: FormBuilder, private competitionService: CompetitionService) {
    // Initialize the form with validation rules
    this.competitionForm = this.fb.group({
      nom: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      lieux: ['']
    });
  }

  ngOnInit(): void {
    // Fetch the list of competitions on component initialization
    this.loadCompetitions();
  }

  // Fetches competitions from the service
  loadCompetitions(): void {
    this.competitionService.getAllCompetitions().subscribe(
      (data) => this.competitions = data,
      (error) => console.error('Failed to load competitions', error)
    );
  }

  // Submits the form to create a new competition
  onSubmit(): void {
    if (this.competitionForm.valid) {
      const newCompetition = this.competitionForm.value;
      this.competitionService.createCompetition(newCompetition).subscribe(
        (response) => {
          this.submissionSuccess = true;
          this.submissionError = null;
          this.loadCompetitions(); // Reload the list of competitions
          this.competitionForm.reset(); // Reset the form
        },
        (error) => {
          this.submissionSuccess = false;
          this.submissionError = 'Failed to create competition. Please try again.';
          console.error('Error creating competition:', error);
        }
      );
    }
  }

  // Views the details of a selected competition
  viewCompetition(id: number): void {
    this.competitionService.getCompetitionById(id).subscribe(
      (competition) => this.selectedCompetition = competition,
      (error) => console.error('Failed to fetch competition details', error)
    );
  }

  // Deletes a competition and updates the list
  deleteCompetition(id: number): void {
    this.competitionService.deleteCompetition(id).subscribe(
      () => {
        this.competitions = this.competitions.filter(c => c.id !== id);
        if (this.selectedCompetition && this.selectedCompetition.id === id) {
          this.selectedCompetition = null; // Clear the selected competition if it was deleted
        }
      },
      (error) => console.error('Failed to delete competition', error)
    );
  }
}
