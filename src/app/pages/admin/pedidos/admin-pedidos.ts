import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { Pedido, PedidoService, STATUS_PEDIDO, moeda } from '../../../services/pedido.service';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [],
  template: `
    <header class="adm-cabecalho">
      <div>
        <h1 class="adm-titulo">Pedidos</h1>
        <p class="adm-sub">Gerenciamento e histórico de vendas</p>
      </div>
      <input class="adm-input busca" type="search" placeholder="Buscar pedido ou cliente..." [value]="termo()" (input)="termo.set($any($event.target).value)">
    </header>

    <section class="adm-card">
      @if (filtrados().length === 0) {
        <p class="adm-vazio">Nenhum pedido encontrado.</p>
      } @else {
        <table class="adm-tabela">
          <thead>
            <tr><th>Pedido</th><th>Cliente</th><th>Data</th><th>Itens</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            @for (p of filtrados(); track p.id) {
              <tr>
                <td><strong>#{{ p.id }}</strong></td>
                <td>{{ p.cliente }}</td>
                <td>{{ formatarData(p.data) }}</td>
                <td>{{ quantidadeItens(p) }}</td>
                <td>{{ moeda(p.total) }}</td>
                <td><span class="adm-pill" [class.alerta]="p.status.startsWith('aguardando')" [class.neutro]="p.status === 'entregue'">{{ rotulo(p) }}</span></td>
              </tr>
            }
          </tbody>
        </table>
      }
    </section>
  `,
  styles: [`
    .busca { width: 280px; }
    @media (max-width: 700px) { .busca { width: 100%; } }
  `],
})
export class AdminPedidos implements OnInit {
  private service = inject(PedidoService);

  moeda = moeda;
  pedidos = signal<Pedido[]>([]);
  termo = signal('');

  filtrados = computed(() => {
    const t = this.termo().trim().toLowerCase();
    return this.pedidos()
      .filter(p => !t || p.id.toLowerCase().includes(t) || p.cliente.toLowerCase().includes(t))
      .sort((a, b) => b.data.localeCompare(a.data));
  });

  ngOnInit() {
    this.service.listar().subscribe(lista => this.pedidos.set(lista));
  }

  rotulo(p: Pedido) {
    return STATUS_PEDIDO[p.status];
  }

  quantidadeItens(p: Pedido) {
    return p.itens.reduce((soma, i) => soma + i.quantidade, 0);
  }

  formatarData(data: string) {
    const d = new Date(data);
    return `${d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} • ${d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  }
}
