import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdherentService } from '../../services/adherent';

@Component({
  selector: 'app-adherent-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adherent-form.html',
  styleUrl: './adherent-form.css'
})
export class AdherentForm implements OnInit {
  form: FormGroup;
  isEditMode = false;
  adherentId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private adherentService: AdherentService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.adherentId = Number(idParam);
      this.loadAdherent(this.adherentId);
    }
  }

  loadAdherent(id: number): void {
    this.loading = true;
    this.adherentService.getById(id).subscribe({
      next: (adherent) => {
        this.form.patchValue(adherent);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors du chargement de l\'adhérent.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const formValue = this.form.value;

    const request = this.isEditMode && this.adherentId
      ? this.adherentService.update(this.adherentId, formValue)
      : this.adherentService.create(formValue);

    request.subscribe({
      next: () => this.router.navigate(['/adherents']),
      error: (err) => {
        this.errorMessage = err.message || 'Erreur lors de l\'enregistrement.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/adherents']);
  }
}