import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZoneService } from '../../../Services/zone.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zone-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './zone-details.component.html',
  styleUrl: './zone-details.component.css'
})
export class ZoneDetailsComponent implements OnInit {
  zone: any;

  constructor(private route: ActivatedRoute, private zoneService: ZoneService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.zoneService.getZoneById(id).subscribe(
      (data) => {
        this.zone = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de la zone', error);
        this.zoneService.redirectTo('/zones'); // Redirect if zone not found
      }
    );
  }
}
