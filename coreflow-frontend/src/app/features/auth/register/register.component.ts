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
  selector: 'app-register',
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
      background: linear-gradient(135deg, #6366f1 0%, #0891b2 50%, #0f766e 100%);
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
      left: -150px;
    }

    .circle-2 {
      position: absolute;
      width: 350px;
      height: 350px;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      bottom: -100px;
      right: -100px;
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

    .cards-preview {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .preview-card {
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 16px;
      padding: 1.2rem;
      backdrop-filter: blur(10px);
    }

    .preview-card-icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .preview-card-value {
      font-size: 1.3rem;
      font-weight: 800;
      color: white;
    }

    .preview-card-label {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.6);
      margin-top: 2px;
    }

    .preview-card.highlight {
      background: rgba(255,255,255,0.22);
      grid-column: span 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .progress-bar-bg {
      height: 6px;
      background: rgba(255,255,255,0.2);
      border-radius: 3px;
      margin-top: 8px;
      overflow: hidden;
    }

    .progress-bar-fill {
      height: 100%;
      width: 68%;
      background: white;
      border-radius: 3px;
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
      margin-bottom: 2rem;
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
      background: linear-gradient(135deg, #6366f1, #0f766e) !important;
      color: white !important;
      border: none !important;
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
      color: #6366f1;
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

        <div class="left-inner">
          <div class="brand">CoreFlow</div>
          <div class="brand-tagline">
            Sua vida financeira organizada<br>de forma simples e compartilhada.
          </div>

          <div class="cards-preview">
            <div class="preview-card">
              <div class="preview-card-icon">💰</div>
              <div class="preview-card-value">R$ 8.4k</div>
              <div class="preview-card-label">Receita mensal</div>
            </div>
            <div class="preview-card">
              <div class="preview-card-icon">📉</div>
              <div class="preview-card-value">R$ 5.1k</div>
              <div class="preview-card-label">Despesas</div>
            </div>
            <div class="preview-card highlight">
              <div>
                <div class="preview-card-label">Meta de economia — 68%</div>
                <div class="preview-card-value" style="font-size:1rem">R$ 3.3k economizados</div>
                <div class="progress-bar-bg">
                  <div class="progress-bar-fill"></div>
                </div>
              </div>
              <div style="font-size:2rem"></div>
            </div>
          </div>

          <div class="features">
            <div class="feature"><div class="feature-dot"></div>Controle total de receitas e despesas</div>
            <div class="feature"><div class="feature-dot"></div>Gráficos e relatórios mensais detalhados</div>
            <div class="feature"><div class="feature-dot"></div>Alertas quando gastos ultrapassam o limite</div>
            <div class="feature"><div class="feature-dot"></div>Compartilhado com seu parceiro em tempo real</div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="form-title">Criar conta </div>
        <div class="form-subtitle">Comece a controlar suas finanças hoje, é grátis</div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Nome completo</mat-label>
            <input matInput formControlName="name" />
            @if (form.get('name')?.hasError('required') && form.get('name')?.touched) {
              <mat-error>Nome obrigatório</mat-error>
            }
          </mat-form-field>

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
            @if (form.get('password')?.hasError('minlength')) {
              <mat-error>Mínimo 6 caracteres</mat-error>
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
              Criar conta grátis
            }
          </button>
        </form>

        <div class="divider">ou</div>

        <div class="footer-link">
          Já tem conta? <a routerLink="/login">Entrar</a>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  form: FormGroup;
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.snackBar.open('Conta criada!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: () => {
        this.snackBar.open('Erro ao criar conta', 'Fechar', { duration: 3000 });
        this.loading.set(false);
      }
    });
  }
}