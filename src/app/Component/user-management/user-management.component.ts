import { Component, OnInit } from '@angular/core'
import {FormBuilder, Validators, FormGroup,ReactiveFormsModule , FormControl} from '@angular/forms'
import { UserService } from '../../Services/user.service'
import { User, UserRole } from '../interfaces/user.interface'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = []
  userForm!: FormGroup
  showUserModal = false
  editMode = false
  viewMode = false
  currentUserId: string | null = null
  currentUser: User | null = null
  userRoles = Object.values(UserRole)
  isUserMenuOpen = false

  constructor (private userService: UserService, private fb: FormBuilder) {
    this.initForm()
  }

  ngOnInit (): void {
    this.loadUsers()
  }

  private initForm (): void {
    this.userForm = this.fb.group({
      Name: ['', Validators.required],
      // lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [UserRole.ZONE_MANAGER, Validators.required],
      // zone: ['', Validators.required],
      // isActive: [true]
    })
  }

  loadUsers (): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users
    })
  }

  openUserModal (): void {
    this.editMode = false
    this.viewMode = false
    this.showUserModal = true
    this.userForm.reset({
      role: UserRole.ZONE_MANAGER,
      // isActive: true
    })
  }

  closeUserModal (): void {
    this.showUserModal = false
    this.userForm.reset()
  }

  viewUser (user: User): void {
    this.viewMode = true
    this.currentUser = user
    this.showUserModal = true
  }

  editUser (user: User): void {
    this.editMode = true
    this.viewMode = false
    this.currentUserId = user.id ?? null
    this.userForm.patchValue(user)
    this.showUserModal = true
  }

  submitUser (): void {
    if (this.userForm.valid) {
      const userData = { ...this.userForm.value, createdAt: new Date() }

      if (this.editMode && this.currentUserId) {
        this.userService
          .updateUser(this.currentUserId, userData)
          .subscribe(() => this.loadUsers())
      } else {
        this.userService.createUser(userData).subscribe(newUser => {
          this.loadUsers()
          this.userService.sendCredentials(newUser.id!).subscribe()
        })
      }

      this.closeUserModal()
    }
  }

  deleteUser (userId: string | undefined): void {
    if (!userId) return

    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(userId).subscribe(() => this.loadUsers())
    }
  }

  userMenuItems = [
    { label: 'Profile', action: () => this.handleProfileClick() },
    { label: 'Déconnexion', action: () => this.handleLogout() }
  ]

  handleProfileClick (): void {
    console.log('Profile clicked')
    this.isUserMenuOpen = false // Fermer le menu après le clic
  }

  handleLogout (): void {
    console.log('Logout clicked')
    this.isUserMenuOpen = false // Fermer le menu après le clic
  }
}
