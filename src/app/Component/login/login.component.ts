// src/app/login/login.component.ts
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../../Services/auth.service'
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup

  constructor (
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login () {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value
      this.authService.login(email, password).subscribe(
        response => {
          // Store token if authentication was successful
          localStorage.setItem('token', response.token)

          // Redirect to a specific route upon successful login
          this.router.navigate(['/admin-dashboard']) // replace '/dashboard' with the desired path
        },
        error => {
          console.error('Login failed', error)
          // Optionally, handle login errors, e.g., show a message to the user
        }
      )
    }
  }
}
