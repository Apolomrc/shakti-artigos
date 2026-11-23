import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { Cliente, ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-admin-clientes',
  standalone: true,
  imports: [],
  template: `
    <header class="adm-cabecalho">
      <div>
        <h1 class="adm-titulo">Clientes</h1>
        <p class="adm-sub">Pessoas cadastradas na loja</p>
      </div>
      <input class="adm-input busca" type="search" placeholder="Nome ou e-mail..." [value]="termo()" (input)="termo.set($any($event.target).value)">
    </header>

    <section class="adm-card">
      @if (filtrados().length === 0) {
        <p class="adm-vazio">{{ clientes().length === 0 ? 'Nenhum cliente cadastrado ainda.' : 'Nenhum cliente encontrado.' }}</p>
      } @else {
        <table class="adm-tabela">
          <thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Cadastrado em</th></tr></thead>
          <tbody>
            @for (c of filtrados(); track c.id) {
              <tr>
                <td><strong>{{ c.nome }}</strong></td>
                <td>{{ c.email }}</td>
                <td>{{ c.telefone || '—' }}</td>
                <td>{{ formatarData(c.criadoEm) }}</td>
              </tr>
            }
          </tbody>
        </table>
      }
    </section>
  `,
  styles: [`
    .busca { width: 260px; }
    @media (max-width: 700px) { .busca { width: 100%; } }
  `],
})
export class AdminClientes implements OnInit {
  private service = inject(ClienteService);

  clientes = signal<Cliente[]>([]);
  termo = signal('');

  filtrados = computed(() => {
    const t = this.termo().trim().toLowerCase();
    return this.clientes().filter(c => !t || `${c.nome} ${c.email}`.toLowerCase().includes(t));
  });

  ngOnInit() {
    this.service.listar().subscribe(lista => this.clientes.set(lista));
  }

  formatarData(data?: string) {
    return data ? new Date(data).toLocaleDateString('pt-BR') : '—';
  }
}
