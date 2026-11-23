import { Injectable, inject, signal } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/** E-mail da equipe. A senha só precisa estar preenchida (login simulado, sem backend). */
export const ADMIN_EMAIL = 'admin@shaktiartigos.com.br';

@Injectable({ providedIn: 'root' })
export class AdminAuth {
  logado = signal(false);

  entrar(email: string, senha: string): boolean {
    const ok = email.trim().toLowerCase() === ADMIN_EMAIL && senha.trim().length > 0;
    this.logado.set(ok);
    return ok;
  }

  sair() {
    this.logado.set(false);
  }
}

/** Impede abrir /admin/* sem ter feito login. */
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AdminAuth);
  return auth.logado() || inject(Router).parseUrl('/admin/login');
};
