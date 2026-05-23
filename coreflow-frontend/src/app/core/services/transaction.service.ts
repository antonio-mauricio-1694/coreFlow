import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TransactionRequest, TransactionResponse } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(dto: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.apiUrl}/transactions`, dto);
  }

  findByHousehold(householdId: number): Observable<TransactionResponse[]> {
    return this.http.get<TransactionResponse[]>(
      `${this.apiUrl}/transactions/household/${householdId}`
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/transactions/${id}`);
  }
}