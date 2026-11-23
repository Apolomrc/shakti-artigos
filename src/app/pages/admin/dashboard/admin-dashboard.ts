import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Pedido, PedidoService, moeda } from '../../../services/pedido.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="adm-cabecalho">
      <div>
        <h1 class="adm-titulo">Visão geral</h1>
        <p class="adm-sub">Resumo das vendas da loja</p>
      </div>
    </header>

    <div class="adm-grid-4">
      <div class="adm-card adm-stat">
        <small>Vendas</small>
        <strong>{{ moeda(vendas7()) }}</strong>
        <span>Últimos 7 dias</span>
      </div>
      <div class="adm-card adm-stat">
        <small>Pedidos</small>
        <strong>{{ pedidos7().length }}</strong>
        <span>Nos últimos 7 dias</span>
      </div>
      <div class="adm-card adm-stat">
        <small>Aguardando pagamento</small>
        <strong>{{ aguardando() }}</strong>
        <span>Pix e boleto em aberto</span>
      </div>
      <div class="adm-card adm-stat">
        <small>Estoque baixo</small>
        <strong>{{ estoqueBaixo() }}</strong>
        <span>Produtos com menos de 5 unidades</span>
      </div>
    </div>

    <div class="linha">
      <section class="adm-card">
        <h2>Vendas nos últimos 7 dias</h2>
        <div class="adm-barras">
          @for (dia of grafico(); track dia.chave) {
            <div class="adm-barra" [class.hoje]="dia.hoje">
              <small>{{ moeda(dia.valor) }}</small>
              <div [style.height.%]="alturaBarra(dia.valor)"></div>
              <span>{{ dia.rotulo }}</span>
            </div>
          }
        </div>
      </section>

      <section class="adm-card">
        <h2>Mais vendidos</h2>
        @if (maisVendidos().length === 0) {
          <p class="adm-vazio">Ainda não há vendas.</p>
        }
        @for (p of maisVendidos(); track p.nome) {
          <div class="top-item">
            <strong>{{ p.nome }}</strong>
            <span>{{ p.quantidade }} unidades</span>
          </div>
        }
      </section>
    </div>

    <section class="adm-card">
      <div class="cabecalho-secao">
        <h2>Pedidos recentes</h2>
        <a routerLink="/admin/pedidos" class="adm-link">Ver todos</a>
      </div>
      @if (pedidos().length === 0) {
        <p class="adm-vazio">Nenhum pedido ainda.</p>
      } @else {
        <table class="adm-tabela">
          <thead><tr><th>Pedido</th><th>Cliente</th><th>Total</th></tr></thead>
          <tbody>
            @for (p of recentes(); track p.id) {
              <tr><td>#{{ p.id }}</td><td>{{ p.cliente }}</td><td>{{ moeda(p.total) }}</td></tr>
            }
          </tbody>
        </table>
      }
    </section>
  `,
  styles: [`
    h2 { margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #082723; }
    .linha { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 16px; margin-bottom: 20px; }
    .top-item { display: flex; flex-direction: column; padding: 10px 0; border-bottom: 1px solid #f0f6f4; font-size: 14px; }
    .top-item span { font-size: 12px; color: #71827e; }
    .cabecalho-secao { display: flex; justify-content: space-between; align-items: center; }
    .cabecalho-secao h2 { margin: 0; }
    @media (max-width: 900px) { .linha { grid-template-columns: 1fr; } }
  `],
})
export class AdminDashboard implements OnInit {
  private produtosService = inject(ProductService);
  private pedidosService = inject(PedidoService);

  moeda = moeda;
  pedidos = signal<Pedido[]>([]);
  private agora = new Date();

  private pagos(lista: Pedido[]) {
    return lista.filter(p => !p.status.startsWith('aguardando'));
  }

  pedidos7 = computed(() => this.pedidos().filter(p => this.diasAtras(p.data) < 7));

  vendas7 = computed(() => this.pagos(this.pedidos7()).reduce((soma, p) => soma + p.total, 0));

  aguardando = computed(() => this.pedidos().filter(p => p.status.startsWith('aguardando')).length);

  estoqueBaixo = computed(() => this.produtosService.produtos().filter(p => p.estoque < 5).length);

  recentes = computed(() =>
    [...this.pedidos()].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5)
  );

  maisVendidos = computed(() => {
    const mapa = new Map<string, number>();
    for (const pedido of this.pagos(this.pedidos())) {
      for (const item of pedido.itens) {
        mapa.set(item.nome, (mapa.get(item.nome) ?? 0) + item.quantidade);
      }
    }
    return [...mapa.entries()]
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 4);
  });

  grafico = computed(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const data = new Date(this.agora);
      data.setDate(data.getDate() - (6 - i));
      const chave = data.toISOString().slice(0, 10);
      const valor = this.pagos(this.pedidos())
        .filter(p => p.data.slice(0, 10) === chave)
        .reduce((soma, p) => soma + p.total, 0);
      return {
        chave,
        rotulo: data.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
        valor,
        hoje: i === 6,
      };
    });
  });

  ngOnInit() {
    this.pedidosService.listar().subscribe(lista => this.pedidos.set(lista));
  }

  alturaBarra(valor: number): number {
    const max = Math.max(...this.grafico().map(d => d.valor), 1);
    return Math.max(4, (valor / max) * 100);
  }

  private diasAtras(data: string): number {
    return (this.agora.getTime() - new Date(data).getTime()) / 86400000;
  }
}
