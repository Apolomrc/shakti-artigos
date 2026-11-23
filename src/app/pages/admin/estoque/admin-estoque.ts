import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-admin-estoque',
  standalone: true,
  imports: [FormsModule],
  template: `
    <header class="adm-cabecalho">
      <div>
        <h1 class="adm-titulo">Estoque</h1>
        <p class="adm-sub">Acompanhe e ajuste as quantidades disponíveis</p>
      </div>
    </header>

    <div class="adm-grid-4 dois">
      <div class="adm-card adm-stat">
        <small>Total de unidades</small>
        <strong>{{ total() }}</strong>
        <span>Somando todos os produtos</span>
      </div>
      <div class="adm-card adm-stat">
        <small>Produtos com estoque baixo</small>
        <strong>{{ baixo() }}</strong>
        <span>Menos de 5 unidades</span>
      </div>
    </div>

    <section class="adm-card">
      @if (produtos().length === 0) {
        <p class="adm-vazio">Nenhum produto cadastrado.</p>
      } @else {
        <table class="adm-tabela">
          <thead>
            <tr><th>Produto</th><th>SKU</th><th>Categoria</th><th>Status</th><th class="num">Quantidade</th><th></th></tr>
          </thead>
          <tbody>
            @for (p of produtos(); track p.id) {
              <tr>
                <td>{{ p.nome }}</td>
                <td>{{ p.sku || '—' }}</td>
                <td>{{ p.categoria }}</td>
                <td><span class="adm-pill" [class.alerta]="p.estoque < 5" [class.neutro]="p.estoque === 0">{{ situacao(p) }}</span></td>
                <td class="num">
                  <input class="adm-input qtd" type="number" min="0" [(ngModel)]="rascunho[p.id]" [name]="'q' + p.id">
                </td>
                <td>
                  <button type="button" class="adm-botao sec" (click)="salvar(p)">Salvar</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </section>
  `,
  styles: [`
    .dois { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 720px; }
    .qtd { width: 100px; text-align: right; }
  `],
})
export class AdminEstoque {
  private service = inject(ProductService);

  produtos = this.service.produtos;
  rascunho: Record<number, number> = {};

  total = computed(() => this.produtos().reduce((soma, p) => soma + p.estoque, 0));
  baixo = computed(() => this.produtos().filter(p => p.estoque < 5).length);

  situacao(p: Product) {
    if (p.estoque === 0) return 'Esgotado';
    if (p.estoque < 5) return 'Estoque baixo';
    return 'Normal';
  }

  salvar(p: Product) {
    const valor = this.rascunho[p.id] ?? p.estoque;
    if (valor < 0 || valor === null) return;
    this.service.ajustarEstoque(p.id, Math.floor(Number(valor))).subscribe(() => {
      delete this.rascunho[p.id];
    });
  }
}
