import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EquipeModel } from '../Models/Tout.Model';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registrationForm: FormGroup ;
  domaines: EquipeModel[] = []; // Utiliser le type Domaine
//   "nom": "Équipe B",
		// "logo": "equipe_b_logo.png",
		// "date_creer": "2021-07-10",
		// "zone_id": 1,
		// "user_id": null,

  constructor() {
    this.registrationForm = this.fb.group({
      nom: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      logo : [''],
      zone_id : [''],
      nom_zone : [''],
      user_id : [''],
      date_creer : ['']

    


    });
  }


  
  ngOnInit(): void {
   
  }




  register() {
    if (this.registrationForm.valid) {
      const userObject = this.registrationForm.value;

      this.authService.registerEquipe(userObject).subscribe(
        (response: any) => {
          console.log('Inscription réussie:', response);

          const loginObject = {
            email: this.registrationForm.get('email')?.value,
            password: this.registrationForm.get('password')?.value
          };

          this.authService.login(loginObject).subscribe(
            (loginResponse: any) => {
              console.log('Connexion réussie:', loginResponse);
              this.router.navigate(['/connexion']);
            },
            (loginError) => {
              console.error('Erreur lors de la connexion:', loginError);
              this.router.navigate(['/connexion']);
            }
          );
        },
        (registerError) => {
          console.error('Erreur lors de l\'inscription:', registerError);
        }
      );
    } else {
      console.error('Le formulaire est invalide.');
    }
  }



  // registerAdmin() {
  //   if (this.registrationForm.valid) {
  //     const userObject = this.registrationForm.value;
  //     this.authService.registerAdmin(userObject).subscribe(
  //       (response: any) => {
  //         console.log(response);
  //         this.router.navigate(['/login']);
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'inscription:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Le formulaire est invalide.');
  //   }
  // }

}
