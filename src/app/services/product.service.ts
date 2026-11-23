import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  descricao: string;
  imagem: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private nextId = 7;

  produtos = signal<Product[]>([
    { id: 1, nome: 'Japamala 108 Contas Pedra Natural', categoria: 'Japamalas', preco: 89.9, estoque: 10,
      descricao: 'Japamala tradicional com 108 contas de pedras naturais e tassel artesanal.',
      imagem: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500' },
    { id: 2, nome: 'Pulseira Quartzo Rosa', categoria: 'Pulseiras', preco: 34.9, estoque: 15,
      descricao: 'Pulseira elástica com esferas naturais de quartzo rosa de 8mm.',
      imagem: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500' },
    { id: 3, nome: 'Fio de Pedra Natural Jade Mix 8mm', categoria: 'Fios de Pedras', preco: 44.9, estoque: 12,
      descricao: 'Fio completo de pedra natural Jade Mix ideal para montagem de acessórios.',
      imagem: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=500' },
    { id: 4, nome: 'Fio Cristal de Vidro Colorido Leitoso 6mm', categoria: 'Fio de Cristal', preco: 19.9, estoque: 30,
      descricao: 'Fio de cristal de vidro leitoso com brilho suave e acabamento uniforme.',
      imagem: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500' },
    { id: 5, nome: 'Anel Ajustável Pedra da Lua', categoria: 'Anéis', preco: 29.9, estoque: 20,
      descricao: 'Anel com aro ajustável e pedra natural lapidada manualmente.',
      imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
    { id: 6, nome: 'Colar Especial de Pedras Naturais', categoria: 'Colares', preco: 56.9, estoque: 5,
      descricao: 'Colar artesanal com combinação exclusiva de pedras naturais e fecho resistente.',
      imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
  ]);

  add(p: Omit<Product, 'id'>) {
    this.produtos.update(list => [...list, { ...p, id: this.nextId++ }]);
  }

  remove(id: number) {
    this.produtos.update(list => list.filter(p => p.id !== id));
  }
}