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
  produtoSelecionado: ProdutoVitrine | null = null;

  get produtosFiltrados(): ProdutoVitrine[] {
    const termo = this.termoBusca.trim().toLowerCase();
    const cat = this.categoriaAtual.trim().toLowerCase();

    return this.service.vitrine().filter(p => {
      if (cat && p.categoria.toLowerCase() !== cat) return false;
      if (termo) {
        const texto = `${p.nome} ${p.categoria} ${p.descricao}`.toLowerCase();
        if (!texto.includes(termo)) return false;
      }
      return true;
    });
  }

  get titulo(): string {
    if (this.termoBusca) return `Resultados para “${this.termoBusca}”`;
    return this.categoriaAtual || 'Todos os produtos';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoriaAtual = params['categoria'] || '';
      this.termoBusca = params['busca'] || '';
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
