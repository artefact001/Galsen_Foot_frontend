import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { EquipeService } from '../../Services/equipe.service'
import { CommonModule } from '@angular/common'
import { CompetitionService } from '../../Services/competition.service'
import { MatcheService } from '../../Services/matche.service'

@Component({
  selector: 'app-matche',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './matche.component.html',
  styleUrls: ['./matche.component.css']
})
export class MatcheComponent implements OnInit {
  matcheForm!: FormGroup
  isEditing = false
  competitions: any[] = []
  equipes: any[] = []
  matchId: string | null = null
  zoneId: number | null = null // Assurez-vous que zoneId est de type number | null

  constructor (
    private fb: FormBuilder,
    private matcheService: MatcheService,
    private competitionService: CompetitionService,
    private equipeService: EquipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit (): void {
    // Initialiser le formulaire
    this.initForm()

    // Charger les compétitions et les équipes
    this.loadCompetitions()
    this.loadEquipes()

    // Vérifier si nous sommes en mode édition (pour un match existant)
    this.route.paramMap.subscribe(params => {
      this.matchId = params.get('id')
      if (this.matchId) {
        this.isEditing = true
        this.loadMatcheDetails(this.matchId)
      }
    })

    // Charger les équipes par zone si zoneId est défini
    if (this.zoneId !== null) {
      this.loadEquipesByZone(this.zoneId)
    }
  }

  // Initialisation du formulaire
  initForm (): void {
    this.matcheForm = this.fb.group({
      competition_id: ['', Validators.required],
      equipe1_id: ['', Validators.required],
      equipe2_id: ['', Validators.required],
      date_matche: ['', Validators.required],
      lieu: ['', Validators.required],
      score_equipe1: [''],
      score_equipe2: [''],
      buteurs: [''],
      passeurs: [''],
      homme_du_matche: [''],
      cartons: [''],
      resultat: ['']
    })
  }

  // Charger les compétitions disponibles
  loadCompetitions (): void {
    this.competitionService.getCompetitions().subscribe(data => {
      this.competitions = data
    })
  }

  // Charger les équipes disponibles
  loadEquipes (): void {
    this.equipeService.getEquipes().subscribe(data => {
      this.equipes = data
    })
  }

  // Charger les équipes par zone
  loadEquipesByZone (zoneId: number): void {
    this.equipeService.getEquipesByZone(zoneId).subscribe(data => {
      this.equipes = data
    })
  }

  // Charger les détails du match en mode édition
  loadMatcheDetails (matcheId: string): void {
    this.matcheService.getMatcheById(+matcheId).subscribe(matche => {
      this.matcheForm.patchValue({
        competition_id: matche.competition_id,
        equipe1_id: matche.equipe1_id,
        equipe2_id: matche.equipe2_id,
        date_matche: matche.date_matche,
        lieu: matche.lieux,
        score_equipe1: matche.score_equipe1,
        score_equipe2: matche.score_equipe2,
        buteurs: matche.buteurs,
        passeurs: matche.passeurs,
        homme_du_matche: matche.homme_du_matche,
        cartons: matche.cartons,
        resultat: matche.resultat
      })
    })
  }

  // Valider si les deux équipes participent à la compétition donnée
  validateTeamsInCompetition (
    competitionId: string,
    equipe1Id: string,
    equipe2Id: string
  ): boolean {
    // Vérifier si les deux équipes sont associées à la compétition
    const equipe1InCompetition = this.competionEquipeCheck(
      competitionId,
      equipe1Id
    )
    const equipe2InCompetition = this.competionEquipeCheck(
      competitionId,
      equipe2Id
    )

    return equipe1InCompetition && equipe2InCompetition
  }

  // Vérifier si une équipe appartient à la compétition donnée
  competionEquipeCheck (competitionId: string, equipeId: string): boolean {
    // Utilisation d'un service pour vérifier l'association dans la table pivot
    return this.competitionService.isEquipeInCompetition(
      competitionId,
      equipeId
    )
  }

  // Méthode exécutée lors de la soumission du formulaire
  onSubmit (): void {
    if (this.matcheForm.invalid) {
      return
    }

    const formValues = this.matcheForm.value

    // Validation de l'appartenance des équipes à la compétition
    const validTeams = this.validateTeamsInCompetition(
      formValues.competition_id,
      formValues.equipe1_id,
      formValues.equipe2_id
    )

    if (!validTeams) {
      alert('Les deux équipes doivent participer à la compétition choisie.')
      return
    }

    // Si le formulaire est valide, envoyer les données au service pour traitement
    const matcheData = { ...formValues }
    if (this.isEditing) {
      this.matcheService.updateMatche(this.matchId!, matcheData).subscribe(
        response => {
          console.log('Match mis à jour avec succès', response)
          alert('Le match a été mis à jour.')
        },
        error => {
          console.error('Erreur lors de la mise à jour du match', error)
        }
      )
    } else {
      const { competition_id, equipe1_id, equipe2_id, date_matche, lieux } =
        matcheData
      this.matcheService
        .createMatche({
          competition_id,
          equipe1_id,
          equipe2_id,
          date_matche,
          lieux
        })
        .subscribe(
          response => {
            console.log('Match ajouté avec succès', response)
            alert('Le match a été ajouté.')
          },
          error => {
            console.error("Erreur lors de l'ajout du match", error)
          }
        )
    }
  }

  // Fonction pour fermer la fenêtre modale ou réinitialiser le formulaire
  closeModal (): void {
    this.matcheForm.reset()
  }
}
