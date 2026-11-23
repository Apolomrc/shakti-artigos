import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CATEGORIAS, Product, ProductService } from '../../../services/product.service';

type Rascunho = Omit<Product, 'id'>;

@Component({
  selector: 'app-admin-produto-form',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <header class="adm-cabecalho">
      <div>
        <h1 class="adm-titulo">{{ id() ? 'Editar produto' : 'Cadastrar produto' }}</h1>
        <p class="adm-sub">Esses dados aparecem direto no site.</p>
      </div>
      <div class="acoes">
        <a routerLink="/admin/produtos" class="adm-botao sec">Cancelar</a>
        <button type="button" class="adm-botao" (click)="salvar()">Salvar produto</button>
      </div>
    </header>

    @if (erro()) {
      <p class="adm-erro">{{ erro() }}</p>
    }

    <div class="grid">
      <section class="adm-card">
        <h2>Imagem</h2>
        <div class="preview">
          @if (form.imagem) {
            <img [src]="form.imagem" alt="Prévia da imagem">
          } @else {
            <span>Cole o link de uma imagem ao lado para ver a prévia</span>
          }
        </div>
        <label class="adm-label largo">Link da imagem
          <input class="adm-input" name="imagem" [(ngModel)]="form.imagem" placeholder="https://...">
        </label>
      </section>

      <section class="adm-card">
        <h2>Informações gerais</h2>
        <div class="adm-form-grid">
          <label class="adm-label largo">Nome do produto
            <input class="adm-input" name="nome" [(ngModel)]="form.nome" placeholder="Ex: Fio de Pedra Natural Jade Mix 8mm">
          </label>

          <label class="adm-label">Categoria
            <select class="adm-input" name="categoria" [(ngModel)]="form.categoria">
              @for (c of categorias; track c) {
                <option [value]="c">{{ c }}</option>
              }
            </select>
          </label>

          <label class="adm-label">SKU (código)
            <input class="adm-input" name="sku" [(ngModel)]="form.sku" placeholder="Ex: SH-JDM-08">
          </label>

          <label class="adm-label">Preço de venda (R$)
            <input class="adm-input" type="number" min="0" step="0.01" name="preco" [(ngModel)]="form.preco">
          </label>

          <label class="adm-label">Estoque
            <input class="adm-input" type="number" min="0" step="1" name="estoque" [(ngModel)]="form.estoque">
          </label>

          <label class="adm-label largo">Descrição
            <textarea class="adm-input" rows="4" name="descricao" [(ngModel)]="form.descricao" placeholder="Detalhes do produto, tamanho, quantidade de contas..."></textarea>
          </label>

          <label class="adm-label largo checkbox">
            <input type="checkbox" name="destaque" [(ngModel)]="form.destaque"> Mostrar em destaque na home
          </label>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .acoes { display: flex; gap: 12px; }
    .grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); gap: 20px; align-items: start; }
    h2 { margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #082723; }
    .preview { display: flex; align-items: center; justify-content: center; height: 260px; margin-bottom: 14px; border: 1px dashed #cfe5e1; border-radius: 12px; background: #f5fbfa; overflow: hidden; }
    .preview img { width: 100%; height: 100%; object-fit: cover; }
    .preview span { padding: 20px; text-align: center; font-size: 13px; color: #71827e; }
    .largo { grid-column: span 2; }
    .checkbox { flex-direction: row; align-items: center; gap: 8px; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  `],
})
export class AdminProdutoForm implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ProductService);

  categorias = CATEGORIAS;
  id = signal<number | null>(null);
  erro = signal('');

  form: Rascunho = { nome: '', categoria: 'Japamalas', sku: '', preco: 0, estoque: 0, descricao: '', imagem: '', destaque: false };

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (!param || param === 'novo') return;

    const id = Number(param);
    const atual = this.service.produtos().find(p => p.id === id);
    if (!atual) {
      this.router.navigateByUrl('/admin/produtos');
      return;
    }
    this.id.set(id);
    const { id: _ignorar, ...dados } = atual;
    this.form = { ...dados, sku: dados.sku ?? '', descricao: dados.descricao ?? '', destaque: !!dados.destaque };
  }

  salvar() {
    const f = this.form;
    if (!f.nome.trim()) return this.erro.set('Informe o nome do produto.');
    if (!(Number(f.preco) > 0)) return this.erro.set('Informe um preço maior que zero.');
    if (Number(f.estoque) < 0) return this.erro.set('O estoque não pode ser negativo.');

    this.erro.set('');
    const dados: Rascunho = {
      ...f,
      nome: f.nome.trim(),
      preco: Number(f.preco),
      estoque: Number(f.estoque),
      imagem: f.imagem || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
    };

    const operacao = this.id() === null
      ? this.service.criar(dados)
      : this.service.atualizar(this.id()!, dados);

    operacao.subscribe({
      next: () => this.router.navigateByUrl('/admin/produtos'),
      error: () => this.erro.set('Não consegui salvar. Confira se a API está rodando (npm run api).'),
    });
  }
}
