
import { Component, OnInit } from '@angular/core';
import { Competition } from '../Component/Models/Tout.Model';
import { CompetitionService } from '../Services/competition.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.css'
})

export class CompetitionComponent implements OnInit {
  competitions: Competition[] = [];
  selectedCompetition: Competition | null = null;
  newCompetition: Competition = { id: 0, nom: '', location: '', date: '' }; // Example fields

  constructor(private competitionService: CompetitionService) {}

  ngOnInit(): void {
    this.loadCompetitions();
  }

  loadCompetitions(): void {
    this.competitionService.getCompetitions().subscribe(
      competitions => this.competitions = competitions,
      error => console.error('Erreur lors du chargement des compétitions:', error)
    );
  }

  viewCompetitionDetails(id: number): void {
    this.competitionService.getCompetitionById(id).subscribe(
      competition => this.selectedCompetition = competition,
      error => console.error('Erreur lors du chargement des détails:', error)
    );
  }

  addCompetition(): void {
    this.competitionService.addCompetition(this.newCompetition).subscribe(
      competition => {
        this.competitions.push(competition);
        this.newCompetition = { id: 0, nom: '', location: '', date: '' }; // Reset form
      },
      error => console.error('Erreur lors de l\'ajout de la compétition:', error)
    );
  }

  updateCompetition(id: number, updatedData: Competition): void {
    this.competitionService.updateCompetition(id, updatedData).subscribe(
      updatedCompetition => {
        const index = this.competitions.findIndex(c => c.id === id);
        if (index !== -1) this.competitions[index] = updatedCompetition;
        this.selectedCompetition = null;
      },
      error => console.error('Erreur lors de la mise à jour de la compétition:', error)
    );
  }

  deleteCompetition(id: number): void {
    this.competitionService.deleteCompetition(id).subscribe(
      () => this.competitions = this.competitions.filter(c => c.id !== id),
      error => console.error('Erreur lors de la suppression de la compétition:', error)
    );
  }
}
