import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Tirage } from '../Models/Tout.Model'
import { TirageService } from '../../Services/tirage.service'

@Component({
  selector: 'app-tirage',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './tirage.component.html',
  styleUrls: ['./tirage.component.css']
})
export class TirageComponent implements OnInit {
  tirageForm!: FormGroup
  tirages: Tirage[] = []

  constructor (private fb: FormBuilder, private tirageService: TirageService) {}

  ngOnInit (): void {
    this.initForm()
    this.loadTirages()
  }

  // Initialisation du formulaire
  initForm (): void {
    this.tirageForm = this.fb.group({
      phase: ['', Validators.required],
      competition_id: ['', Validators.required],
      nombre_poules: ['', Validators.required]
    })
  }

  // Charger les tirages
  loadTirages (): void {
    this.tirageService.getTirages().subscribe(data => {
      this.tirages = data
    })
  }

  // Lancer un tirage
  onSubmit (): void {
    if (this.tirageForm.invalid) {
      return
    }

    const formValues = this.tirageForm.value
    this.tirageService.lancerTirage(formValues).subscribe(
      response => {
        console.log('Tirage lancé avec succès', response)
        alert('Le tirage a été lancé.')
        this.loadTirages() // Recharger les tirages après l'ajout
      },
      error => {
        console.error('Erreur lors du lancement du tirage', error)
      }
    )
  }
}
