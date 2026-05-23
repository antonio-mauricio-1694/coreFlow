import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';
import { FinancialService } from '../../core/services/financial.service';
import { TransactionService } from '../../core/services/transaction.service';
import { FinancialSummary, AlertLevel } from '../../core/models/alert.model';
import { TransactionResponse, TransactionCategory, TransactionType } from '../../core/models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  readonly HOUSEHOLD_ID = 1;
  readonly USER_ID = 1;

  summary = signal<FinancialSummary | null>(null);
  transactions = signal<TransactionResponse[]>([]);
  loading = signal(false);
  loadingTx = signal(false);

  form: FormGroup;

  displayedColumns = ['description', 'type', 'category', 'amount', 'date', 'createdBy', 'actions'];

  categories: { value: TransactionCategory; label: string }[] = [
    { value: 'FOOD', label: 'Alimentação' },
    { value: 'TRANSPORT', label: 'Transporte' },
    { value: 'ESSENTIAL', label: 'Essencial' },
    { value: 'HEALTH', label: 'Saúde' },
    { value: 'LEISURE', label: 'Lazer' },
    { value: 'INVESTMENT', label: 'Investimento' },
    { value: 'EDUCATION', label: 'Educação' },
    { value: 'OTHER', label: 'Outro' }
  ];

  types: { value: TransactionType; label: string }[] = [
    { value: 'INCOME', label: 'Receita' },
    { value: 'EXPENSE', label: 'Despesa' }
  ];

  constructor(
    private authService: AuthService,
    private financialService: FinancialService,
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      type: ['EXPENSE', Validators.required],
      category: ['OTHER', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSummary();
    this.loadTransactions();
  }

  loadSummary(): void {
    this.loading.set(true);
    this.financialService.getSummary(this.HOUSEHOLD_ID).subscribe({
      next: data => {
        this.summary.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.snackBar.open('Erro ao carregar resumo', 'Fechar', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  loadTransactions(): void {
    this.loadingTx.set(true);
    this.transactionService.findByHousehold(this.HOUSEHOLD_ID).subscribe({
      next: data => {
        this.transactions.set(data);
        this.loadingTx.set(false);
      },
      error: () => this.loadingTx.set(false)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);

    const payload = {
      ...this.form.value,
      householdId: this.HOUSEHOLD_ID,
      userId: this.USER_ID
    };

    this.transactionService.create(payload).subscribe({
      next: () => {
        this.snackBar.open('Transação adicionada!', 'Fechar', { duration: 3000 });
        this.form.patchValue({ description: '', amount: null });
        this.loadSummary();
        this.loadTransactions();
      },
      error: () => {
        this.snackBar.open('Erro ao salvar transação', 'Fechar', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }

  deleteTransaction(id: number): void {
    this.transactionService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Removida!', 'Fechar', { duration: 2000 });
        this.loadSummary();
        this.loadTransactions();
      }
    });
  }

  alertColor(level: AlertLevel): string {
    const map: Record<AlertLevel, string> = {
      OK: 'primary',
      WARNING: 'accent',
      DANGER: 'warn',
      CRITICAL: 'warn'
    };
    return map[level];
  }

  categoryLabel(value: string): string {
    return this.categories.find(c => c.value === value)?.label ?? value;
  }

  logout(): void {
    this.authService.logout();
  }
}