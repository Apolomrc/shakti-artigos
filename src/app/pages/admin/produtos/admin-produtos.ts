import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService, ProdutoVitrine, formatarProduto } from '../../../services/product.service';

@Component({
  selector: 'app-admin-produtos',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="adm-cabecalho">
      <div>
        <h1 class="adm-titulo">Produtos</h1>
        <p class="adm-sub">{{ service.produtos().length }} itens cadastrados</p>
      </div>
      <div class="acoes">
        <input class="adm-input busca" type="search" placeholder="Buscar produto..." [value]="termo()" (input)="termo.set($any($event.target).value)">
        <a routerLink="/admin/produtos/novo" class="adm-botao">Novo produto</a>
      </div>
    </header>

    <section class="adm-card">
      @if (filtrados().length === 0) {
        <p class="adm-vazio">Nenhum produto encontrado.</p>
      } @else {
        <table class="adm-tabela">
          <thead>
            <tr><th>Produto</th><th>SKU</th><th>Categoria</th><th class="num">Preço</th><th class="num">Estoque</th><th></th></tr>
          </thead>
          <tbody>
            @for (p of filtrados(); track p.id) {
              <tr>
                <td>
                  <div class="produto-celula">
                    <img [src]="p.imagem" [alt]="p.nome">
                    <span>{{ p.nome }}</span>
                  </div>
                </td>
                <td>{{ p.sku || '—' }}</td>
                <td>{{ p.categoria }}</td>
                <td class="num">{{ p.precoFormatado }}</td>
                <td class="num">{{ p.estoque }}</td>
                <td class="acoes-linha">
                  <a [routerLink]="['/admin/produtos', p.id]" class="adm-link">Editar</a>
                  <button type="button" class="adm-link perigo" (click)="remover(p)">Remover</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </section>
  `,
  styles: [`
    .acoes { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .busca { width: 240px; }
    .produto-celula { display: flex; align-items: center; gap: 12px; }
    .produto-celula img { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; }
    .acoes-linha { white-space: nowrap; }
    .acoes-linha .adm-link { margin-right: 14px; }
    @media (max-width: 700px) { .busca { width: 100%; } }
  `],
})
export class AdminProdutos {
  service = inject(ProductService);
  termo = signal('');

  filtrados = computed<ProdutoVitrine[]>(() => {
    const t = this.termo().trim().toLowerCase();
    return this.service.produtos()
      .map(formatarProduto)
      .filter(p => !t || `${p.nome} ${p.categoria} ${p.sku ?? ''}`.toLowerCase().includes(t));
  });

  remover(p: ProdutoVitrine) {
    if (confirm(`Remover "${p.nome}"?`)) {
      this.service.remove(p.id);
    }
  }
}
