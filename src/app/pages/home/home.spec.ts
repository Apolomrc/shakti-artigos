import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produto } from '../../components/product/produto';

@Component({
  imports: [RouterLink, Produto],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  destaques = [
    {
      nome: 'Fio Cristal de Vidro Colorido Leitoso 6mm',
      categoria: 'Fio de Cristal',
      preco: 'R$ 19,90',
      pagamento: 'ou 3x de R$ 6,96 · R$ 18,90 no depósito',
      descricao: 'Fio de cristal de vidro leitoso com brilho suave e acabamento uniforme.',
      imagem: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500'
    },
    {
      nome: 'Fio de Pedra Natural Jade Mix 8mm',
      categoria: 'Fios de Pedras',
      preco: 'R$ 44,90',
      pagamento: 'ou 8x de R$ 6,26 · R$ 42,66 no depósito',
      descricao: 'Fio completo de pedra natural Jade Mix ideal para montagem de acessórios.',
      imagem: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500'
    },
    {
      nome: 'Fio de Pedras Naturais Artesanal',
      categoria: 'Fios de Pedras',
      preco: 'R$ 39,90',
      pagamento: 'ou 6x de R$ 6,65 · R$ 37,90 no depósito',
      descricao: 'Fio artesanal de pedras naturais selecionadas com excelente acabamento.',
      imagem: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500'
    },
    {
      nome: 'Colar Especial de Pedras Naturais',
      categoria: 'Colares',
      preco: 'R$ 56,90',
      pagamento: 'ou 8x de R$ 7,94 · R$ 54,05 no depósito',
      descricao: 'Colar artesanal com combinação exclusiva de pedras naturais e fecho resistente.',
      imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500'
    }
  ];

  produtoSelecionado: any = null;

  abrirDetalhes(item: any) {
    this.produtoSelecionado = item;
  }

  fecharDetalhes() {
    this.produtoSelecionado = null;
  }
}