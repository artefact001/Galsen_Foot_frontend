// import { inject, Injectable } from '@angular/core'
// import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { Observable } from 'rxjs'
// import { apiUrl } from './apiUrl'
// import { Competition } from '../Component/Models/Tout.Model'
// @Injectable({
//   providedIn: 'root'
// })
// export class CompetitionService {
//   /**
//    * Checks if a given team (equipe) is participating in a specified competition.
//    * 
//    * @param competitionId - The ID of the competition to check.
//    * @param equipeId - The ID of the team (equipe) to verify.
//    * @returns A boolean indicating whether the team is part of the competition.
//    */
//   isEquipeInCompetition(competitionId: string, equipeId: string): boolean {
//     throw new Error('Method not implemented.')
//   }
//   private readonly apiUrl = `${apiUrl}/competitions`

//   // Injection du HttpClient dans le service
//   private readonly http = inject(HttpClient)

//   // Méthode pour obtenir toutes les compétitions
// getCompetitions (): Observable<Competition[]> {
//   const token = localStorage.getItem('access_token');
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//     return this.http.get<Competition[]>(this.apiUrl,  { headers })
//   }

//   // Méthode pour obtenir une compétition par son ID
//   getCompetitionById (id: number): Observable<Competition> {
//     const token = localStorage.getItem('access_token');
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//     return this.http.get<Competition>(`${this.apiUrl}/${id}`,  { headers })
//   }

//   // Méthode pour ajouter une nouvelle compétition
//   addCompetition (competition: Competition): Observable<Competition> {
//     const token = localStorage.getItem('access_token');
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//     return this.http.post<Competition>(this.apiUrl, competition , { headers })
//   }




  // Méthode pour mettre à jour une compétition existante
  // updateCompetition (
  //   id: number competition: Competition): Observable<Competition> {
  //   const token = localStorage.getItem('access_token');
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.put<Competition>(`${this.apiUrl}/${id}`,  { headers })
  // }

  // Méthode pour supprimer une compétition
  // deleteCompetition (id: number): Observable<void> {
    // const token = localStorage.getItem('access_token');
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`,  { headers })
  // }
// }



import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './apiUrl';
import { Competition } from '../Component/Models/Tout.Model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private readonly apiUrl = `${apiUrl}/competitions`;
  private readonly http = inject(HttpClient);

  // Méthode pour obtenir toutes les compétitions
  getCompetitions(): Observable<Competition[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<Competition[]>(this.apiUrl, { headers });
  }

  // Méthode pour obtenir une compétition par son ID
  getCompetitionById(id: number): Observable<Competition> {
    const headers = this.createAuthHeaders();
    return this.http.get<Competition>(`${this.apiUrl}/${id}`, { headers });
  }

  // Méthode pour ajouter une nouvelle compétition
  addCompetition(competition: Competition): Observable<Competition> {
    const headers = this.createAuthHeaders();
    return this.http.post<Competition>(this.apiUrl, competition, { headers });
  }

  // Méthode pour mettre à jour une compétition existante
  updateCompetition(id: number, competition: Competition): Observable<Competition> {
    const headers = this.createAuthHeaders();
    return this.http.put<Competition>(`${this.apiUrl}/${id}`, competition, { headers });
  }

  // Méthode pour supprimer une compétition
  deleteCompetition(id: number): Observable<void> {
    const headers = this.createAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Méthode pour vérifier si une équipe participe à une compétition
  isEquipeInCompetition(competitionId: string, equipeId: string): Observable<boolean> {
    const headers = this.createAuthHeaders();
    return this.http.get<{ isInCompetition: boolean }>(`${this.apiUrl}/${competitionId}/teams/${equipeId}`, { headers })
      .pipe(map(response => response.isInCompetition));
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}

