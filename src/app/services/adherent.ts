import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Adherent, AdherentInput } from '../models/adherent';
import { Page } from '../models/page';

@Injectable({ providedIn: 'root' })
export class AdherentService {
  private readonly baseUrl = `${environment.apiUrl}/adherents`;

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 20, sort?: string): Observable<Page<Adherent>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (sort) {
      params = params.set('sort', sort);
    }
    return this.http.get<Page<Adherent>>(this.baseUrl, { params });
  }

  getById(id: number): Observable<Adherent> {
    return this.http.get<Adherent>(`${this.baseUrl}/${id}`);
  }

  create(adherent: AdherentInput): Observable<Adherent> {
    return this.http.post<Adherent>(this.baseUrl, adherent);
  }

  update(id: number, adherent: AdherentInput): Observable<Adherent> {
    return this.http.put<Adherent>(`${this.baseUrl}/${id}`, adherent);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}