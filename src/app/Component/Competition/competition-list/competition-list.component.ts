import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService } from '../../../Services/competition.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-competition-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './competition-list.component.html',
  styleUrl: './competition-list.component.css'
})

export class CompetitionsListComponent implements OnInit {
  competitions: any[] = [];

  constructor(private competitionService: CompetitionService, private router: Router) {}

  ngOnInit(): void {
    this.competitionService.getAllCompetitions().subscribe((data: any[]) => {
      this.competitions = data;
    });
  }

  viewCompetition(id: number) {
    this.router.navigate(['/competitions', id]);
  }

  editCompetition(id: number) {
    this.router.navigate(['/competitions/edit', id]);
  }

  deleteCompetition(id: number) {
    this.competitionService.deleteCompetition(id).subscribe(() => {
      this.competitions = this.competitions.filter(c => c.id !== id);
    });
  }
}
