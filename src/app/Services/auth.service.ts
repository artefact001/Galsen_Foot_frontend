// src/app/auth.service.ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { HttpClientModule } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'

  constructor (private http: HttpClient) {}

  login (email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
  }

  register (
    name: string,
    email: string,
    password: string,
    role_id: number
  ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      name,
      email,
      password,
      role_id
    })
  }
}
