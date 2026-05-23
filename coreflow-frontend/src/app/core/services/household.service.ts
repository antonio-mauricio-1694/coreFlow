import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface HouseholdResponse {
  id: number;
  name: string;
  members: string[];
}

@Injectable({ providedIn: 'root' })
export class HouseholdService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(name: string): Observable<HouseholdResponse> {
    return this.http.post<HouseholdResponse>(
      `${this.apiUrl}/households?name=${name}`, {}
    );
  }

  findAll(): Observable<HouseholdResponse[]> {
    return this.http.get<HouseholdResponse[]>(`${this.apiUrl}/households`);
  }

  findById(id: number): Observable<HouseholdResponse> {
    return this.http.get<HouseholdResponse>(`${this.apiUrl}/households/${id}`);
  }

  addUser(householdId: number, userId: number): Observable<HouseholdResponse> {
    return this.http.post<HouseholdResponse>(
      `${this.apiUrl}/households/add-user`,
      { householdId, userId }
    );
  }
}