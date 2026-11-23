import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

type Entrega = 'pac' | 'sedex';

/**
 * Checkout somente visual: contato, endereço e entrega funcionam;
 * pagamento ainda não está ativo, então o pedido não é enviado.
 */
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  cart = inject(CartService);
  private auth = inject(AuthService);

  // Dados de contato: já vêm preenchidos se o cliente estiver logado.
  nome = signal(this.auth.usuario()?.nome ?? '');
  email = signal(this.auth.usuario()?.email ?? '');
  telefone = signal(this.auth.usuario()?.telefone ?? '');

  cep = '';
  endereco = '';
  numero = '';
  complemento = '';
  bairro = '';
  cidade = '';

  entrega = signal<Entrega>('pac');

  // Valores fixos de exemplo, iguais ao desenho. O cálculo real virá depois.
  readonly opcoesEntrega = [
    { id: 'pac' as Entrega, nome: 'Correios PAC', prazo: '5 a 8 dias úteis', valor: 18.9 },
    { id: 'sedex' as Entrega, nome: 'Correios SEDEX', prazo: '2 a 3 dias úteis', valor: 32.5 },
  ];

  frete = computed(() => this.opcoesEntrega.find(o => o.id === this.entrega())?.valor ?? 0);
  totalPedido = computed(() => this.cart.total() + this.frete());

  moeda(valor: number) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
