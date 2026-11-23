import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Produto } from '../../components/product/produto';
import { ProductService, ProdutoVitrine } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [Produto, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  service = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  categoriaAtual = '';
  termoBusca = '';
  ordem = '';
  produtoSelecionado: ProdutoVitrine | null = null;

  get produtosFiltrados(): ProdutoVitrine[] {
    const termo = this.termoBusca.trim().toLowerCase();
    const cat = this.categoriaAtual.trim().toLowerCase();

    const lista = this.service.vitrine().filter(p => {
      if (cat && p.categoria.toLowerCase() !== cat) return false;
      if (termo) {
        const texto = `${p.nome} ${p.categoria} ${p.descricao}`.toLowerCase();
        if (!texto.includes(termo)) return false;
      }
      return true;
    });
    return this.ordem === 'novidades' ? [...lista].sort((a, b) => b.id - a.id) : lista;
  }

  get titulo(): string {
    if (this.termoBusca) return `Resultados para “${this.termoBusca}”`;
    if (this.ordem === 'novidades') return 'Novidades';
    return this.categoriaAtual || 'Todos os produtos';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoriaAtual = params['categoria'] || '';
      this.termoBusca = params['busca'] || '';
      this.ordem = params['ordem'] || '';
      this.cdr.detectChanges();
    });
  }

  abrirDetalhes(item: ProdutoVitrine) {
    this.produtoSelecionado = item;
  }

  fecharDetalhes() {
    this.produtoSelecionado = null;
  }
}
