import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { User, UserRole } from '../interfaces/user.interface';
// import { ToastrService } from 'ngx-toastr'; // Pour les notifications de succès et erreur
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zone-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zone-dashboard.component.html',
  styleUrls: ['./zone-dashboard.component.css']
})
export class ZoneDashboardComponent implements OnInit {
  users: User[] = [];
  zoneForm!: FormGroup;
  showUserModal = false;
  editMode = false;
  viewMode = false;
  currentUserId: string | null = null;
  currentUser: User | null = null;
  userRoles = Object.values(UserRole);
  isUserMenuOpen = false;
  isLoading = false; // Indicateur de chargement

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    // private toastr: ToastrService // Pour les notifications
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Initialisation du formulaire
  private initForm(): void {
    this.zoneForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [UserRole.EQUIPE_MANAGER, Validators.required],
      equipe: ['', Validators.required],
      isActive: [true]
    });
  }

  // Chargement des utilisateurs
  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
        // this.toastr.error('Une erreur est survenue lors du chargement des utilisateurs');
        this.isLoading = false;
      }
    });
  }

  // Ouverture du modal pour ajouter un utilisateur
  openUserModal(): void {
    this.editMode = false;
    this.viewMode = false;
    this.showUserModal = true;
    this.zoneForm.reset({
      role: UserRole.EQUIPE_MANAGER,
      isActive: true
    });
  }

  // Fermeture du modal
  closeUserModal(): void {
    this.showUserModal = false;
    this.zoneForm.reset();
  }

  // Affichage des détails d'un utilisateur
  viewUser(user: User): void {
    this.viewMode = true;
    this.currentUser = user;
    this.showUserModal = true;
  }

  // Ouverture du formulaire pour modifier un utilisateur
  editUser(user: User): void {
    this.editMode = true;
    this.viewMode = false;
    this.currentUserId = user.id ?? null;
    this.zoneForm.patchValue(user);
    this.showUserModal = true;
  }

  // Soumission du formulaire pour ajouter ou modifier un utilisateur
  submitUser(): void {
    if (this.zoneForm.valid) {
      const userData = { ...this.zoneForm.value, createdAt: new Date() };

      if (this.editMode && this.currentUserId) {
        this.userService.updateUser(this.currentUserId, userData).pipe(
          catchError((err) => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
            // this.toastr.error('Une erreur est survenue lors de la mise à jour de l\'utilisateur');
            return of([]); // Retourne une observable vide pour éviter de casser le flux
          })
        ).subscribe(() => {
          this.loadUsers();
          // this.toastr.success('Utilisateur mis à jour avec succès');
        });
      } else {
        this.userService.createUser(userData).pipe(
          catchError((err) => {
            console.error('Erreur lors de la création de l\'utilisateur', err);
            // this.toastr.error('Une erreur est survenue lors de la création de l\'utilisateur');
            return of([]);
          })
        ).subscribe((newUser) => {
          this.loadUsers();
          // this.userService.sendCredentials(newUser.id!).subscribe();
          // this.toastr.success('Utilisateur créé avec succès');
        });
      }

      this.closeUserModal();
    }
  }

  // Suppression d'un utilisateur
  deleteUser(userId: string | undefined): void {
    if (!userId) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).pipe(
        catchError((err) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', err);
          // this.toastr.error('Une erreur est survenue lors de la suppression');
          return of([]);
        })
      ).subscribe(() => {
        this.loadUsers();
        // this.toastr.success('Utilisateur supprimé avec succès');
      });
    }
  }

  // Gestion du menu utilisateur (profil et déconnexion)
  userMenuItems = [
    { label: 'Profile', action: () => this.handleProfileClick() },
    { label: 'Déconnexion', action: () => this.handleLogout() }
  ];

  handleProfileClick(): void {
    console.log('Profile clicked');
    this.isUserMenuOpen = false; // Fermer le menu après le clic
  }

  handleLogout(): void {
    console.log('Logout clicked');
    this.isUserMenuOpen = false; // Fermer le menu après le clic
  }
}
