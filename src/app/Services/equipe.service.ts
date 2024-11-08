import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { apiUrl } from './apiUrl' // Assurez-vous que ce chemin est correct
import { Equipe } from '../Component/Models/Tout.Model'

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private readonly apiUrl = `${apiUrl}/equipes`

  constructor (private http: HttpClient) {}

  // Obtenir toutes les équipes
  getEquipes (): Observable<Equipe[]> {
    return this.http
      .get<Equipe[]>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
  }

  // Obtenir les équipes par zone
  getEquipesByZone (zoneId: number): Observable<Equipe[]> {
    return this.http
      .get<Equipe[]>(`${this.apiUrl}?zone_id=${zoneId}`, {
        headers: this.getHeaders()
      })
      .pipe(catchError(this.handleError))
  }

  // Ajouter une nouvelle équipe
  addEquipe (equipe: Equipe): Observable<Equipe> {
    return this.http
      .post<Equipe>(this.apiUrl, equipe, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError))
  }

  // Mettre à jour une équipe
  updateEquipe (id: number, equipe: Equipe): Observable<Equipe> {
    return this.http
      .put<Equipe>(`${this.apiUrl}/${id}`, equipe, {
        headers: this.getHeaders()
      })
      .pipe(catchError(this.handleError))
  }

  // Supprimer une équipe
  deleteEquipe (id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
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
