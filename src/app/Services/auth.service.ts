import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { apiUrl } from "./apiUrl";
import { Observable } from "rxjs";

@Injectable ({
  providedIn: 'root'

})

export class AuthService{
  // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);
  @Injectable({
    providedIn: 'root'
  })


  // Decaration des methods

    // method to login
  login(identifiant: any)  {
    return this.http.post(`${apiUrl}/auth/login`, identifiant)
  }

  // method to register
  register(identifiant: any) {
    return this.http.post(`${apiUrl}/auth/register`, identifiant)
  }

  registerZone(identifiant: any) {
    return this.http.post(`${apiUrl}/zones`, identifiant)
  }

  registerEquipe(identifiant: any) {
    return this.http.post(`${apiUrl}/equipes`, identifiant)
  }

  registerAdmin(identifiant: any) {
    return this.http.post(`${apiUrl}/register/admin`, identifiant)
  }

  //  // Méthode pour récupérer les domaines
  //  getSpecialisations(): Observable<string[]> {
  //   return this.http.get<string[]>(`${apiUrl}/domaines`);
  // }

  // ngOnInit(): void {
  //   this.authService.getSpecialisations().subscribe(
  //     (data: DomaineModel[]) => {
  //       console.log('Domaines chargés:', data);
  //       this.domaines = data;
  //     },
  //     (error) => {
  //       console.error('Erreur lors du chargement des domaines:', error);
  //     }
  //   );
  // }


 // Method to logout
 logout() {
  const token = localStorage.getItem('access_token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${apiUrl}/logout`, { headers });
}






//   login(email: string, password: string): Observable<any> {







//   // isAuthenticated(): boolean {
//   //   // TODO: implement authentication logic
//   //   return true;
//   // }
// }

//ACCESS AU TOKEN
  getToken(): string | null {
    return localStorage.getItem('access_token'); // Exemple d'obtention du token
  }

}
