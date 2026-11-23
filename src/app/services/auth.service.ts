import { Injectable, computed, signal } from '@angular/core';
import { Cliente } from './cliente.service';

/**
 * Sessão do cliente (somente front-end, sem senha).
 * A sessão some ao recarregar a página; o cadastro fica salvo no db.json.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  usuario = signal<Cliente | null>(null);

  primeiroNome = computed(() => this.usuario()?.nome.split(' ')[0] ?? '');

  entrar(cliente: Cliente) {
    this.usuario.set(cliente);
  }

  sair() {
    this.usuario.set(null);
  }
}
