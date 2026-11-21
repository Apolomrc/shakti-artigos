import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../../components/product/produto';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [Produto],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  produtos = [
    {
      nome: 'Japamala 108 Contas Pedra Natural',
      categoria: 'japamalas',
      preco: 'R$ 89,90',
      pagamento: 'ou 8x de R$ 11,23 · R$ 85,40 no depósito',
      descricao: 'Japamala tradicional com 108 contas de pedras naturais e tassel artesanal.',
      imagem: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500'
    },
    {
      nome: 'Pulseira Quartzo Rosa',
      categoria: 'pulseiras',
      preco: 'R$ 34,90',
      pagamento: 'ou 4x de R$ 8,72 · R$ 33,15 no depósito',
      descricao: 'Pulseira elástica com esferas naturais de quartzo rosa de 8mm.',
      imagem: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500'
    },
    {
      nome: 'Fio de Pedra Natural Jade Mix 8mm',
      categoria: 'Fios de Pedras',
      preco: 'R$ 44,90',
      pagamento: 'ou 8x de R$ 6,26 · R$ 42,66 no depósito',
      descricao: 'Fio completo de pedra natural Jade Mix ideal para montagem de acessórios.',
      imagem: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500'
    },
    {
      nome: 'Fio Cristal de Vidro Colorido Leitoso 6mm',
      categoria: 'Fio de Cristal',
      preco: 'R$ 19,90',
      pagamento: 'ou 3x de R$ 6,96 · R$ 18,90 no depósito',
      descricao: 'Fio de cristal de vidro leitoso com brilho suave e acabamento uniforme.',
      imagem: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500'
    },
    {
      nome: 'Anel Ajustável Pedra da Lua',
      categoria: 'Anéis',
      preco: 'R$ 29,90',
      pagamento: 'ou 3x de R$ 9,96 · R$ 28,40 no depósito',
      descricao: 'Anel com aro ajustável e pedra natural lapidada manualmente.',
      imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500'
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

  produtosFiltrados = this.produtos;
  categoriaAtual = '';
  produtoSelecionado: any = null;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const categoria = params['categoria'];
      this.categoriaAtual = categoria || '';

      if (categoria) {
        this.produtosFiltrados = this.produtos.filter(
          item => item.categoria.toLowerCase() === categoria.toLowerCase()
        );
      } else {
        this.produtosFiltrados = this.produtos;
      }
      
      // Força o Angular a redesenhar a tela na mesma hora
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