import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { apiUrl } from './apiUrl'
import { Matche } from '../Component/interfaces/matche.interface'
import { Equipe } from '../Component/Models/Tout.Model'

@Injectable({
  providedIn: 'root'
})
export class MatcheService {
  private readonly apiUrl = `${apiUrl}/matches`

  constructor (private http: HttpClient) {}

  // Obtenir les équipes d'une compétition
  getEquipesByCompetition (competitionId: number): Observable<Equipe[]> {
    return this.http
      .get<Equipe[]>(`${apiUrl}/competitions/${competitionId}/equipes`, {
        headers: this.getHeaders()
      })
      .pipe(catchError(this.handleError))
  }

  // Obtenir tous les matchs
  getMatches (): Observable<Matche[]> {
    return this.http
      .get<Matche[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
  }

  // Obtenir les matchs à venir
  getUpcomingMatches (): Observable<Matche[]> {
    return this.http
      .get<Matche[]>(`${this.apiUrl}/venirs`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
  }

  // Obtenir un match par son ID
  getMatcheById (id: number): Observable<Matche> {
    return this.http
      .get<Matche>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
  }

  // Ajouter un nouveau match
  createMatche (matche: Partial<Matche>): Observable<Matche> {
    return this.http
      .post<Matche>(this.apiUrl, matche, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
  }

  // Mettre à jour un match existant
  updateMatche (id: string, matche: Matche): Observable<Matche> {
    return this.http
      .put<Matche>(`${this.apiUrl}/${id}`, matche, {
        headers: this.getHeaders()
      })
      .pipe(catchError(this.handleError))
  }

  // Obtenir les en-têtes pour les requêtes HTTP
  private getHeaders (): HttpHeaders {
    const token = localStorage.getItem('access_token')
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  // Gestion des erreurs
  private handleError (error: any): Observable<never> {
    console.error("Une erreur s'est produite:", error)
    return throwError(
      () => new Error('Une erreur est survenue; veuillez réessayer plus tard.')
    )
  }
}
