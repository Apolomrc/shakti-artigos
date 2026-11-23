import { Injectable, computed, signal } from '@angular/core';
import { Product } from './product.service';

export interface ItemCarrinho {
  produto: Product;
  quantidade: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  itens = signal<ItemCarrinho[]>([]);
  /** Controla se o painel lateral do carrinho está aberto. */
  aberto = signal(false);

  quantidadeTotal = computed(() =>
    this.itens().reduce((soma, i) => soma + i.quantidade, 0)
  );

  total = computed(() =>
    this.itens().reduce((soma, i) => soma + i.produto.preco * i.quantidade, 0)
  );

  abrir() {
    this.aberto.set(true);
  }

  fechar() {
    this.aberto.set(false);
  }

  /** Quantidade já reservada no carrinho para este produto. */
  quantidadeNoCarrinho(id: number): number {
    return this.itens().find(i => i.produto.id === id)?.quantidade ?? 0;
  }

  /** Adiciona `qtd` unidades, sem passar do estoque. Retorna quantas couberam. */
  adicionar(produto: Product, qtd = 1): number {
    const disponivel = Math.max(0, produto.estoque - this.quantidadeNoCarrinho(produto.id));
    const aAdicionar = Math.min(qtd, disponivel);
    if (aAdicionar <= 0) return 0;

    this.itens.update(lista => {
      const existe = lista.some(i => i.produto.id === produto.id);
      return existe
        ? lista.map(i =>
            i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + aAdicionar } : i
          )
        : [...lista, { produto, quantidade: aAdicionar }];
    });
    return aAdicionar;
  }

  alterarQuantidade(id: number, delta: number) {
    this.itens.update(lista =>
      lista
        .map(i => {
          if (i.produto.id !== id) return i;
          const nova = Math.min(i.quantidade + delta, i.produto.estoque);
          return { ...i, quantidade: nova };
        })
        .filter(i => i.quantidade > 0)
    );
  }

  remover(id: number) {
    this.itens.update(lista => lista.filter(i => i.produto.id !== id));
  }

  esvaziar() {
    this.itens.set([]);
  }
}
