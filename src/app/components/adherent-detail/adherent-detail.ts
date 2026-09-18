import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AdherentService } from '../../services/adherent';
import { Adherent } from '../../models/adherent';

@Component({
  selector: 'app-adherent-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './adherent-detail.html',
  styleUrl: './adherent-detail.css'
})
export class AdherentDetail implements OnInit {
  adherent: Adherent | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private adherentService: AdherentService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;

    this.adherentService.getById(id).subscribe({
      next: (result) => {
        this.adherent = result;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message || 'Adhérent introuvable.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}