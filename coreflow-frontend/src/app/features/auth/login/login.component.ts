import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCardModule,
    MatSnackBarModule, MatProgressSpinnerModule
  ],
  styles: [`
    .auth-wrapper {
      display: flex;
      min-height: 100vh;
      background: #ffffff;
    }

    .left-panel {
      flex: 1;
      background: linear-gradient(135deg, #0f766e 0%, #0891b2 40%, #6366f1 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 4rem;
      position: relative;
      overflow: hidden;
    }

    .circle-1 {
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
      top: -150px;
      right: -150px;
    }

    .circle-2 {
      position: absolute;
      width: 350px;
      height: 350px;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      bottom: -100px;
      left: -100px;
    }

    .circle-3 {
      position: absolute;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: rgba(255,255,255,0.07);
      top: 40%;
      left: 10%;
    }

    .left-inner {
      position: relative;
      z-index: 1;
      max-width: 440px;
      width: 100%;
    }

    .brand {
      font-size: 3rem;
      font-weight: 900;
      color: white;
      letter-spacing: -2px;
      margin-bottom: 0.5rem;
    }

    .brand-tagline {
      font-size: 1.1rem;
      color: rgba(255,255,255,0.75);
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }

    .finance-illustration {
      width: 100%;
      border-radius: 20px;
      overflow: hidden;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 1.5rem;
      margin-bottom: 2rem;
    }

    .chart-bars {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      height: 80px;
      margin-bottom: 1rem;
    }

    .bar {
      flex: 1;
      border-radius: 6px 6px 0 0;
      background: rgba(255,255,255,0.3);
      transition: height 0.3s;
    }

    .bar.accent { background: rgba(255,255,255,0.8); }

    .chart-labels {
      display: flex;
      gap: 8px;
    }

    .chart-label {
      flex: 1;
      text-align: center;
      font-size: 0.7rem;
      color: rgba(255,255,255,0.6);
    }

    .stats-row {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .stat-pill {
      flex: 1;
      background: rgba(255,255,255,0.15);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 12px;
      padding: 0.8rem 1rem;
      text-align: center;
    }

    .stat-pill-value {
      font-size: 1.2rem;
      font-weight: 800;
      color: white;
    }

    .stat-pill-label {
      font-size: 0.72rem;
      color: rgba(255,255,255,0.65);
      margin-top: 2px;
    }

    .features {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .feature {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: rgba(255,255,255,0.85);
      font-size: 0.9rem;
    }

    .feature-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.6);
      flex-shrink: 0;
    }

    .right-panel {
      width: 480px;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 4rem;
    }

    .form-title {
      font-size: 2rem;
      font-weight: 800;
      color: #111827;
      margin-bottom: 0.4rem;
      letter-spacing: -0.5px;
    }

    .form-subtitle {
      color: #9ca3af;
      margin-bottom: 2.5rem;
      font-size: 0.95rem;
    }

    .full-width {
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .submit-btn {
      width: 100%;
      height: 52px;
      font-size: 1rem;
      font-weight: 700;
      margin-top: 0.5rem;
      border-radius: 12px !important;
      background: linear-gradient(135deg, #0f766e, #6366f1) !important;
      color: white !important;
      border: none !important;
      letter-spacing: 0.3px;
      box-shadow: 0 4px 20px rgba(99,102,241,0.35) !important;
    }

    .submit-btn:disabled { opacity: 0.4; box-shadow: none !important; }

    .divider {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 1.8rem 0 1rem;
      color: #d1d5db;
      font-size: 0.82rem;
    }

    .divider::before, .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #f3f4f6;
    }

    .footer-link {
      text-align: center;
      font-size: 0.9rem;
      color: #9ca3af;
    }

    .footer-link a {
      color: #0f766e;
      text-decoration: none;
      font-weight: 700;
    }

    @media (max-width: 768px) {
      .left-panel { display: none; }
      .right-panel { width: 100%; padding: 2rem; }
    }
  `],
  template: `
    <div class="auth-wrapper">
      <div class="left-panel">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>

        <div class="left-inner">
          <div class="brand">CoreFlow</div>
          <div class="brand-tagline">
            Controle financeiro inteligente<br>para casais e famílias.
          </div>

          <div class="finance-illustration">
            <div class="chart-bars">
              <div class="bar" style="height:40%"></div>
              <div class="bar" style="height:65%"></div>
              <div class="bar accent" style="height:85%"></div>
              <div class="bar" style="height:55%"></div>
              <div class="bar accent" style="height:90%"></div>
              <div class="bar" style="height:70%"></div>
              <div class="bar accent" style="height:100%"></div>
            </div>
            <div class="chart-labels">
              <div class="chart-label">Jan</div>
              <div class="chart-label">Fev</div>
              <div class="chart-label">Mar</div>
              <div class="chart-label">Abr</div>
              <div class="chart-label">Mai</div>
              <div class="chart-label">Jun</div>
              <div class="chart-label">Jul</div>
            </div>
            <div class="stats-row">
              <div class="stat-pill">
                <div class="stat-pill-value">+24%</div>
                <div class="stat-pill-label">Economia</div>
              </div>
              <div class="stat-pill">
                <div class="stat-pill-value">R$4.2k</div>
                <div class="stat-pill-label">Saldo</div>
              </div>
              <div class="stat-pill">
                <div class="stat-pill-value">12</div>
                <div class="stat-pill-label">Metas</div>
              </div>
            </div>
          </div>

          <div class="features">
            <div class="feature"><div class="feature-dot"></div>Dashboard com visão financeira completa</div>
            <div class="feature"><div class="feature-dot"></div>Alertas automáticos de gastos excessivos</div>
            <div class="feature"><div class="feature-dot"></div>Household compartilhado em tempo real</div>
            <div class="feature"><div class="feature-dot"></div>Relatórios mensais por categoria</div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="form-title">Bem-vindo</div>
        <div class="form-subtitle">Entre na sua conta para continuar</div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>E-mail</mat-label>
            <input matInput formControlName="email" type="email" />
            @if (form.get('email')?.hasError('required') && form.get('email')?.touched) {
              <mat-error>E-mail obrigatório</mat-error>
            }
            @if (form.get('email')?.hasError('email')) {
              <mat-error>E-mail inválido</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Senha</mat-label>
            <input matInput formControlName="password" type="password" />
            @if (form.get('password')?.hasError('required') && form.get('password')?.touched) {
              <mat-error>Senha obrigatória</mat-error>
            }
          </mat-form-field>

          <button
            mat-raised-button
            class="submit-btn"
            type="submit"
            [disabled]="form.invalid || loading()">
            @if (loading()) {
              <mat-spinner diameter="24" />
            } @else {
              Entrar na conta
            }
          </button>
        </form>

        <div class="divider">ou</div>

        <div class="footer-link">
          Não tem conta? <a routerLink="/register">Cadastre-se grátis</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  form: FormGroup;
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.authService.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.snackBar.open('Email ou senha inválidos', 'Fechar', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }
}