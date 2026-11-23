import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../components/product/produto';
import { ProductService, ProdutoVitrine } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Produto],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private service = inject(ProductService);

  mostrarLogin = false;

  abrirLogin() {
    this.mostrarLogin = true;
  }

  fecharLogin() {
    this.mostrarLogin = false;
  }

  destaques = this.service.destaques;

  produtoSelecionado: ProdutoVitrine | null = null;

  abrirDetalhes(item: ProdutoVitrine) {
    this.produtoSelecionado = item;
  }

  fecharDetalhes() {
    this.produtoSelecionado = null;
  }
}
