import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FinancialSummary } from '../models/alert.model';

@Injectable({ providedIn: 'root' })
export class FinancialService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSummary(householdId: number): Observable<FinancialSummary> {
    return this.http.get<FinancialSummary>(
      `${this.apiUrl}/financial/summary/${householdId}`
    );
  }

  getMonthlySummary(householdId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/financial/summary/${householdId}/monthly`
    );
  }
}