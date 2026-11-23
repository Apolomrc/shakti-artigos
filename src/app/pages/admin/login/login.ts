import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuth, ADMIN_EMAIL } from '../admin-auth';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-admin">
      <section class="painel-marca">
        <img src="/logo.png" alt="Shakti Artigos">
        <p>PAINEL ADMINISTRATIVO</p>
      </section>

      <section class="painel-form">
        <div class="caixa">
          <span class="etiqueta">ÁREA ADMINISTRATIVA</span>
          <h1>Entrar no painel</h1>
          <p class="ajuda">Use o e-mail e a senha de administrador.</p>

          @if (erro()) {
            <p class="erro">E-mail ou senha inválidos.</p>
          }

          <form (ngSubmit)="entrar()">
            <label>E-mail
              <input type="email" name="email" [(ngModel)]="email" [placeholder]="emailPadrao" autocomplete="username">
            </label>

            <label>Senha
              <span class="campo-senha">
                <input [type]="mostrarSenha() ? 'text' : 'password'" name="senha" [(ngModel)]="senha" placeholder="Sua senha" autocomplete="current-password">
                <button type="button" (click)="mostrarSenha.set(!mostrarSenha())">{{ mostrarSenha() ? 'Ocultar' : 'Mostrar' }}</button>
              </span>
            </label>

            <label class="lembrar"><input type="checkbox" name="lembrar" [(ngModel)]="lembrar"> Manter conectado</label>

            <button type="submit" class="entrar">Entrar</button>
          </form>

          <p class="rodape-ajuda">Acesso restrito à equipe da loja.</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: 'Montserrat', sans-serif; }
    .login-admin { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
    .painel-marca { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: #061a18; color: #20b8b0; }
    .painel-marca img { width: 260px; max-width: 70%; }
    .painel-marca p { margin: 0; font-size: 12px; letter-spacing: 3px; }
    .painel-form { display: flex; align-items: center; justify-content: center; padding: 40px; background: #f5fbfa; }
    .caixa { width: min(380px, 100%); }
    .etiqueta { font-size: 11px; letter-spacing: 3px; color: #07978f; }
    h1 { margin: 10px 0 8px; font-size: 30px; font-weight: 400; color: #082723; }
    .ajuda { margin: 0 0 24px; font-size: 14px; color: #5b6f6a; }
    form { display: flex; flex-direction: column; gap: 16px; }
    label { display: flex; flex-direction: column; gap: 6px; font-size: 13px; color: #44615c; }
    input[type='email'], input[type='text'], input[type='password'] { padding: 12px 14px; border: 1px solid #cfe5e1; border-radius: 10px; font: inherit; font-size: 14px; background: #fff; outline: none; }
    input:focus { border-color: #20b8b0; }
    .campo-senha { position: relative; display: block; }
    .campo-senha input { width: 100%; box-sizing: border-box; padding-right: 72px; }
    .campo-senha button { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); border: none; background: none; color: #07978f; font-size: 12px; cursor: pointer; }
    .lembrar { flex-direction: row; align-items: center; gap: 8px; }
    .entrar { margin-top: 6px; padding: 13px; border: none; border-radius: 25px; background: #20b8b0; color: #fff; font: inherit; font-size: 15px; cursor: pointer; }
    .entrar:hover { background: #0d2b2b; }
    .erro { margin: 0 0 14px; padding: 10px 14px; border-radius: 10px; background: #fbd9d5; color: #a3261c; font-size: 13px; }
    .rodape-ajuda { margin: 20px 0 0; text-align: center; font-size: 12px; color: #71827e; }
    @media (max-width: 760px) { .login-admin { grid-template-columns: 1fr; } .painel-marca { min-height: 220px; } }
  `],
})
export class AdminLogin {
  private auth = inject(AdminAuth);
  private router = inject(Router);

  emailPadrao = ADMIN_EMAIL;
  email = '';
  senha = '';
  lembrar = false;
  mostrarSenha = signal(false);
  erro = signal(false);

  entrar() {
    const email = this.email || this.emailPadrao;
    if (this.auth.entrar(email, this.senha)) {
      this.erro.set(false);
      this.router.navigateByUrl('/admin');
    } else {
      this.erro.set(true);
    }
  }
}
