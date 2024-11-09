import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

interface DashboardCard {
  title: string
  value: string | number
  icon: string
  bgColor: string
}

interface Activity {
  title: string
  description: string
  time: string
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  // État de la sidebar et du dropdown utilisateur
  isSidebarVisible: boolean = true
  isMobileView: boolean = false
  isUserMenuOpen: boolean = false

  // Données des cartes du dashboard
  dashboardCards: DashboardCard[] = [
    {
      title: 'Zones',
      value: '1234',
      icon: 'fas fa-users',
      bgColor: 'bg-primary'
    },
    {
      title: 'Competitions',
      value: '578 ',
      icon: 'fas fa-foots',
      bgColor: 'bg-success'
    },
    {
      title: 'Equipes',
      value: '932',
      icon: 'fas fa-team',
      bgColor: 'bg-warning'
    },
    { title: 'Visites', value: '10853', icon: 'fas fa-eye', bgColor: 'bg-info' }
  ]

  // Données des activités récentes
  recentActivities: Activity[] = [
    {
      title: 'Nouvelle commande',
      description: 'Client: John Doe',
      time: '3 min'
    },
    {
      title: 'Nouveau message',
      description: 'Support: Question produit',
      time: '1 heure'
    },
    {
      title: 'Mise à jour stock',
      description: 'Produit XYZ: +50 unités',
      time: '2 heures'
    }
  ]

  // Liens de la sidebar
  sidebarLinks = [
    { title: 'Accueil', icon: 'fas fa-home', route: '/dashboard' },
    { title: 'Statistiques', icon: 'fas fa-chart-bar', route: '/stats' },
    { title: 'Utilisateurs', icon: 'fas fa-users', route: '/users' },
    { title: 'Paramètres', icon: 'fas fa-cog', route: '/settings' }
  ]

  constructor () {
    this.checkScreenSize()
    window.addEventListener('resize', () => this.checkScreenSize())

    // Ajouter un écouteur pour fermer le dropdown lors d'un clic à l'extérieur
    window.addEventListener('click', (e: Event) => {
      if (!(e.target as Element).closest('.user-dropdown')) {
        this.isUserMenuOpen = false
      }
    })
  }

  ngOnInit (): void {
    this.checkScreenSize()
  }

  ngOnDestroy (): void {
    window.removeEventListener('resize', () => this.checkScreenSize())
    window.removeEventListener('click', (e: Event) => {
      if (!(e.target as Element).closest('.user-dropdown')) {
        this.isUserMenuOpen = false
      }
    })
  }

  // Vérifie la taille de l'écran et met à jour isMobileView
  private checkScreenSize (): void {
    this.isMobileView = window.innerWidth <= 768
    this.isSidebarVisible = !this.isMobileView
  }

  // Bascule l'état de la sidebar
  toggleSidebar (): void {
    this.isSidebarVisible = !this.isSidebarVisible
  }

  // Ferme la sidebar sur mobile lors d'un clic à l'extérieur
  onOutsideClick (event: MouseEvent): void {
    if (this.isMobileView) {
      const sidebar = document.getElementById('sidebar')
      const sidebarToggle = document.getElementById('sidebarToggle')
      const userDropdown = document.querySelector('.user-dropdown')

      if (sidebar && sidebarToggle && userDropdown) {
        const clickedElement = event.target as HTMLElement
        if (
          !sidebar.contains(clickedElement) &&
          !sidebarToggle.contains(clickedElement) &&
          !userDropdown.contains(clickedElement)
        ) {
          this.isSidebarVisible = false
          this.isUserMenuOpen = false
        }
      }
    }
  }

  // Gestion du dropdown du profil utilisateur
  userMenuItems = [
    { label: 'Profile', action: () => this.handleProfileClick() },
    { label: 'Déconnexion', action: () => this.handleLogout() }
  ]

  handleProfileClick (): void {
    console.log('Profile clicked')
    this.isUserMenuOpen = false // Fermer le dropdown après le clic
  }

  handleLogout (): void {
    console.log('Logout clicked')
    this.isUserMenuOpen = false // Fermer le dropdown après le clic
  }
}
