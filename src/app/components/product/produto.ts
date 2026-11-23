import { Component, Input, Output, EventEmitter, inject, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProdutoVitrine } from '../../services/product.service';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [],
  templateUrl: './produto.html',
  styleUrl: './produto.css'
})
export class Produto {
  private cart = inject(CartService);

  @Input() produto!: ProdutoVitrine;
  @Output() fechar = new EventEmitter<void>();

  quantidade = signal(1);
  mensagem = signal('');
  adicionadoAgora = signal(false);

  /** Unidades que ainda podem ser escolhidas, descontando o que já está no carrinho. */
  get disponivel(): number {
    return Math.max(0, this.produto.estoque - this.cart.quantidadeNoCarrinho(this.produto.id));
  }

  get semEstoque() {
    return this.disponivel <= 0;
  }

  mudarQuantidade(delta: number) {
    const nova = Math.min(Math.max(1, this.quantidade() + delta), Math.max(1, this.disponivel));
    this.quantidade.set(nova);
  }

  adicionarAoCarrinho() {
    const adicionadas = this.cart.adicionar(this.produto, this.quantidade());
    if (adicionadas > 0) {
      this.adicionadoAgora.set(true);
      this.mensagem.set(
        adicionadas < this.quantidade()
          ? `Adicionamos ${adicionadas} unidade(s), o máximo disponível.`
          : 'Adicionado ao carrinho!'
      );
      this.quantidade.set(1);
    } else {
      this.mensagem.set('Você já tem todas as unidades disponíveis no carrinho.');
    }
  }

  verCarrinho() {
    this.voltar();
    this.cart.abrir();
  }

  voltar() {
    this.fechar.emit();
  }
}
