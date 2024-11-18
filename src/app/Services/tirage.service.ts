import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TirageService {
  private apiUrl = 'http://localhost:8000/api/tirages';
  constructor(private http: HttpClient) {}

  // Récupérer tous les tirages
  getTirages(competitionId?: number): Observable<any> {
    const url = competitionId ? `${this.apiUrl}?competition_id=${competitionId}` : this.apiUrl;
    return this.http.get(url);
  }

  // Lancer un tirage
  lancerTirage(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lancer`, data);
  }
}

//   // Obtenir les en-têtes pour les requêtes HTTP
//   private getHeaders (): HttpHeaders {
//     const token = localStorage.getItem('access_token')
//     return new HttpHeaders({
//       Authorization: `Bearer ${token}`
//     })
//   }

//   // Gestion des erreurs
//   private handleError (error: any): Observable<never> {
//     console.error("Une erreur s'est produite:", error)
//     return throwError(
//       () => new Error('Une erreur est survenue; veuillez réessayer plus tard.')
//     )
//   }
// }
