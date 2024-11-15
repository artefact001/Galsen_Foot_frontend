import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompetitionService {
  getCompetitionById(competitionId: number | undefined) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/api/competitions';
  private http = inject(HttpClient);

  getAllCompetitions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCompetition(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCompetition(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateCompetition(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  deleteCompetition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
    // Méthode pour obtenir les détails d'une compétition
  getCompetitionDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/details`);
  }
}
