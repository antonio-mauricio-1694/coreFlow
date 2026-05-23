import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';
import { FinancialService } from '../../core/services/financial.service';
import { TransactionService } from '../../core/services/transaction.service';
import { FinancialSummary } from '../../core/models/alert.model';
import { TransactionResponse, TransactionCategory, TransactionType } from '../../core/models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, CurrencyPipe,
    MatSnackBarModule, MatProgressSpinnerModule, MatIconModule
  ],
  styleUrl: './dashboard.component.scss',
  template: `
    <div class="layout">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-brand">Core<span>Flow</span></div>
        <nav class="sidebar-nav">
          <div class="nav-item active">
            <mat-icon>dashboard</mat-icon> Dashboard
          </div>
          <div class="nav-item">
            <mat-icon>swap_horiz</mat-icon> Transações
          </div>
          <div class="nav-item">
            <mat-icon>home</mat-icon> Household
          </div>
          <div class="nav-item">
            <mat-icon>bar_chart</mat-icon> Relatórios
          </div>
        </nav>
        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()">
            <mat-icon>logout</mat-icon> Sair
          </button>
        </div>
      </aside>

      <!-- MAIN -->
      <main class="main">

        <!-- TOPBAR -->
        <div class="topbar">
          <div class="topbar-title">Dashboard</div>
          <div class="topbar-right">
            <div class="avatar">AN</div>
          </div>
        </div>

        <!-- ALERTA -->
        @if (summary()?.alert; as alert) {
          <div class="alert-bar" [class]="'alert-' + alert.level.toLowerCase()">
            <mat-icon class="alert-icon">
              {{ alert.level === 'OK' ? 'check_circle' : alert.level === 'WARNING' ? 'warning' : 'error' }}
            </mat-icon>
            <span class="alert-msg">{{ alert.message }}</span>
            <span class="alert-badge">{{ alert.usagePercent | number:'1.0-0' }}% da receita</span>
          </div>
        }

        <!-- MÉTRICAS -->
        <div class="metrics">
          <div class="metric-card green">
            <div class="metric-icon green-icon">
              <mat-icon>savings</mat-icon>
            </div>
            <div class="metric-info">
              <div class="metric-label">Receitas</div>
              <div class="metric-value">
                {{ summary()?.totalIncome | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
              </div>
            </div>
          </div>
          <div class="metric-card red">
            <div class="metric-icon red-icon">
              <mat-icon>trending_down</mat-icon>
            </div>
            <div class="metric-info">
              <div class="metric-label">Despesas</div>
              <div class="metric-value">
                {{ summary()?.totalExpense | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
              </div>
            </div>
          </div>
          <div class="metric-card blue">
            <div class="metric-icon blue-icon">
              <mat-icon>account_balance</mat-icon>
            </div>
            <div class="metric-info">
              <div class="metric-label">Saldo</div>
              <div class="metric-value" [class.negative]="(summary()?.balance ?? 0) < 0">
                {{ summary()?.balance | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
              </div>
            </div>
          </div>
          <div class="metric-card purple">
            <div class="metric-icon purple-icon">
              <mat-icon>pie_chart</mat-icon>
            </div>
            <div class="metric-info">
              <div class="metric-label">Uso da receita</div>
              <div class="metric-value">
                {{ summary()?.alert?.usagePercent | number:'1.0-0' }}%
              </div>
            </div>
          </div>
        </div>

        <!-- GRID INFERIOR -->
        <div class="bottom-grid">

          <!-- NOVA TRANSAÇÃO -->
          <div class="card form-card">
            <div class="card-title">
              <mat-icon>add_circle_outline</mat-icon> Nova Transação
            </div>
            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="tx-form">
              <div class="form-row">
                <div class="field">
                  <label>Descrição</label>
                  <input formControlName="description" placeholder="Ex: Supermercado" />
                </div>
                <div class="field small">
                  <label>Valor</label>
                  <input formControlName="amount" type="number" step="0.01" placeholder="0,00" />
                </div>
              </div>
              <div class="form-row">
                <div class="field">
                  <label>Tipo</label>
                  <select formControlName="type">
                    @for (t of types; track t.value) {
                      <option [value]="t.value">{{ t.label }}</option>
                    }
                  </select>
                </div>
                <div class="field">
                  <label>Categoria</label>
                  <select formControlName="category">
                    @for (c of categories; track c.value) {
                      <option [value]="c.value">{{ c.label }}</option>
                    }
                  </select>
                </div>
                <div class="field">
                  <label>Data</label>
                  <input formControlName="date" type="date" />
                </div>
              </div>
              <button class="add-btn" type="submit" [disabled]="form.invalid || loading()">
                @if (loading()) {
                  <mat-spinner diameter="20" />
                } @else {
                  <mat-icon>add</mat-icon> Adicionar
                }
              </button>
            </form>
          </div>

          <!-- CATEGORIAS -->
          @if (summary()?.expenseByCategory) {
            <div class="card category-card">
              <div class="card-title">
                <mat-icon>donut_large</mat-icon> Despesas por categoria
              </div>
              <div class="category-list">
                @for (cat of getCategoryEntries(); track cat[0]) {
                  <div class="category-item">
                    <div class="category-name">{{ categoryLabel(cat[0]) }}</div>
                    <div class="category-bar-wrap">
                      <div class="category-bar" [style.width]="getCategoryPercent(cat[1]) + '%'"></div>
                    </div>
                    <div class="category-value">
                      {{ cat[1] | currency:'BRL':'symbol':'1.0-0':'pt-BR' }}
                    </div>
                  </div>
                }
              </div>
            </div>
          }

        </div>

        <!-- TABELA -->
        <div class="card table-card">
          <div class="card-title">
            <mat-icon>receipt_long</mat-icon> Transações recentes
          </div>

          @if (loadingTx()) {
            <div class="loading"><mat-spinner diameter="32" /></div>
          }

          @if (!loadingTx() && transactions().length === 0) {
            <div class="empty">Nenhuma transação registrada ainda.</div>
          }

          @if (transactions().length > 0) {
            <table class="tx-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Tipo</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Por</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                @for (tx of transactions(); track tx.id) {
                  <tr>
                    <td>{{ tx.description }}</td>
                    <td>
                      <span class="badge" [class]="tx.type === 'INCOME' ? 'badge-green' : 'badge-red'">
                        {{ tx.type === 'INCOME' ? 'Receita' : 'Despesa' }}
                      </span>
                    </td>
                    <td>{{ categoryLabel(tx.category) }}</td>
                    <td [class]="tx.type === 'INCOME' ? 'val-green' : 'val-red'">
                      {{ tx.type === 'INCOME' ? '+' : '-' }}
                      {{ tx.amount | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
                    </td>
                    <td>{{ tx.date }}</td>
                    <td>{{ tx.createdBy }}</td>
                    <td>
                      <button class="del-btn" (click)="deleteTransaction(tx.id)">
                        <mat-icon>delete_outline</mat-icon>
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          }
        </div>

      </main>
    </div>
  `
})
export class DashboardComponent implements OnInit {

  readonly HOUSEHOLD_ID = 1;
  readonly USER_ID = 1;

  summary = signal<FinancialSummary | null>(null);
  transactions = signal<TransactionResponse[]>([]);
  loading = signal(false);
  loadingTx = signal(false);

  form: FormGroup;

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
    this.financialService.getSummary(this.HOUSEHOLD_ID).subscribe({
      next: data => this.summary.set(data),
      error: () => this.snackBar.open('Erro ao carregar resumo', 'Fechar', { duration: 3000 })
    });
  }

  loadTransactions(): void {
    this.loadingTx.set(true);
    this.transactionService.findByHousehold(this.HOUSEHOLD_ID).subscribe({
      next: data => { this.transactions.set(data); this.loadingTx.set(false); },
      error: () => this.loadingTx.set(false)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);

    this.transactionService.create({
      ...this.form.value,
      householdId: this.HOUSEHOLD_ID,
      userId: this.USER_ID
    }).subscribe({
      next: () => {
        this.snackBar.open('Transação adicionada!', 'Fechar', { duration: 3000 });
        this.form.patchValue({ description: '', amount: null });
        this.loading.set(false);
        this.loadSummary();
        this.loadTransactions();
      },
      error: () => this.loading.set(false)
    });
  }

  deleteTransaction(id: number): void {
    this.transactionService.delete(id).subscribe({
      next: () => { this.loadSummary(); this.loadTransactions(); }
    });
  }

  getCategoryEntries(): [string, number][] {
    const map = this.summary()?.expenseByCategory;
    if (!map) return [];
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }

  getCategoryPercent(value: number): number {
    const entries = this.getCategoryEntries();
    const max = entries[0]?.[1] ?? 1;
    return Math.round((value / max) * 100);
  }

  categoryLabel(value: string): string {
    return this.categories.find(c => c.value === value)?.label ?? value;
  }

  logout(): void {
    this.authService.logout();
  }
}