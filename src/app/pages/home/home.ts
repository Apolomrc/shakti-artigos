import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Produto } from '../../components/product/produto';
import { ProductService, ProdutoVitrine } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, Produto],
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

  /** Destaques primeiro, depois o restante do catálogo. */
  ordenada = computed(() =>
    [...this.service.vitrine()].sort((a, b) => Number(!!b.destaque) - Number(!!a.destaque))
  );

  total = computed(() => this.ordenada().length);
  quantidade = signal(4);
  visiveis = computed(() => this.ordenada().slice(0, this.quantidade()));

  verMais() {
    this.quantidade.update(q => Math.min(q + 4, this.total()));
  }

  fecharLista() {
    this.quantidade.set(4);
  }

  // Newsletter (ainda sem backend: só feedback visual)
  emailNewsletter = '';
  enviando = signal(false);
  inscrito = signal(false);
  erroNewsletter = signal('');

  inscrever() {
    const email = this.emailNewsletter.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.erroNewsletter.set('Digite um e-mail válido.');
      return;
    }
    this.erroNewsletter.set('');
    this.enviando.set(true);
    setTimeout(() => {
      this.enviando.set(false);
      this.inscrito.set(true);
    }, 900);
  }

  produtoSelecionado: ProdutoVitrine | null = null;

  abrirDetalhes(item: ProdutoVitrine) {
    this.produtoSelecionado = item;
  }

  fecharDetalhes() {
    this.produtoSelecionado = null;
  }
}
