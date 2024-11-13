import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Competition } from '../Component/Models/Tout.Model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private apiUrl = '/api/competitions';

  constructor(private http: HttpClient) {}

  // List all competitions
  getAllCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get a competition by ID
  getCompetitionById(id: number): Observable<Competition> {
    return this.http.get<Competition>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new competition
  createCompetition(data: Partial<Competition>): Observable<Competition> {
    return this.http.post<Competition>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing competition
  updateCompetition(id: number, data: Partial<Competition>): Observable<Competition> {
    return this.http.put<Competition>(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a competition
  deleteCompetition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('An error occurred while processing the request.'));
  }
}
