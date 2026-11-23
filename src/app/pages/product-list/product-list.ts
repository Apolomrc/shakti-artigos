import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../components/product/produto';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [Produto],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private service = inject(ProductService);

  categoriaAtual = '';
  produtoSelecionado: any = null;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  get produtos() {
    return this.service.produtos().map(p => {
      const parcelas = p.preco >= 40 ? 8 : p.preco >= 30 ? 4 : 3;
      const valorParcela = Math.floor((p.preco / parcelas) * 100) / 100;
      const deposito = Math.floor(p.preco * 0.95 * 100) / 100;
      return {
        id: p.id,
        nome: p.nome,
        categoria: p.categoria,
        preco: this.moeda(p.preco),
        pagamento: `ou ${parcelas}x de ${this.moeda(valorParcela)} · ${this.moeda(deposito)} no depósito`,
        descricao: p.descricao,
        imagem: p.imagem
      };
    });
  }

  get produtosFiltrados() {
    if (!this.categoriaAtual) return this.produtos;
    return this.produtos.filter(
      item => item.categoria.toLowerCase() === this.categoriaAtual.toLowerCase()
    );
  }

  private moeda(valor: number) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoriaAtual = params['categoria'] || '';
      this.cdr.detectChanges();
    });
  }

  abrirDetalhes(item: any) {
    this.produtoSelecionado = item;
  }

  fecharDetalhes() {
    this.produtoSelecionado = null;
  }
}