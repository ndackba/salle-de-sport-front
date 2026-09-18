import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdherentService } from '../../services/adherent';
import { Adherent } from '../../models/adherent';
import { Page } from '../../models/page';

@Component({
  selector: 'app-adherent-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './adherent-list.html',
  styleUrl: './adherent-list.css'
})
export class AdherentList implements OnInit {
  page: Page<Adherent> | null = null;
  currentPage = 0;
  pageSize = 10;
  loading = false;
  errorMessage = '';

  constructor(
    private adherentService: AdherentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPage(0);
  }

  loadPage(pageNumber: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.adherentService.getAll(pageNumber, this.pageSize, 'nom,asc').subscribe({
      next: (result: Page<Adherent>) => {
        this.page = result;
        this.currentPage = pageNumber;
        this.loading = false;
        console.log('Données reçues !', result, 'loading =', this.loading);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.errorMessage = err.message || 'Erreur lors du chargement des adhérents.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  nextPage(): void {
    if (this.page && this.currentPage < this.page.totalPages - 1) {
      this.loadPage(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.loadPage(this.currentPage - 1);
    }
  }

  deleteAdherent(id: number): void {
    if (!confirm('Supprimer cet adhérent ?')) return;

    this.adherentService.delete(id).subscribe({
      next: () => this.loadPage(this.currentPage),
      error: (err: any) => this.errorMessage = err.message || 'Erreur lors de la suppression.'
    });
  }
}