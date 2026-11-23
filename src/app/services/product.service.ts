import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API_URL } from './api';

export interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  descricao: string;
  imagem: string;
  destaque?: boolean;
  sku?: string;
}

/** Categorias oficiais. Usadas no header, nas bolinhas da home e no admin. */
export const CATEGORIAS = [
  'Japamalas',
  'Pulseiras',
  'Fios de Pedras',
  'Fio de Cristal',
  'Anéis',
  'Colares',
] as const;

/** Visão do produto pronta para exibição (preço formatado, parcelamento). */
export interface ProdutoVitrine extends Product {
  precoFormatado: string;
  pagamento: string;
}

const moeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatarProduto(p: Product): ProdutoVitrine {
  const parcelas = p.preco >= 40 ? 8 : p.preco >= 30 ? 4 : 3;
  const valorParcela = Math.floor((p.preco / parcelas) * 100) / 100;
  const deposito = Math.floor(p.preco * 0.95 * 100) / 100;
  return {
    ...p,
    precoFormatado: moeda(p.preco),
    pagamento: `ou ${parcelas}x de ${moeda(valorParcela)} · ${moeda(deposito)} no depósito`,
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  produtos = signal<Product[]>([]);
  /** true quando a API não respondeu na última tentativa de carregar. */
  erroApi = signal(false);

  vitrine = computed(() => this.produtos().map(formatarProduto));
  destaques = computed(() => this.vitrine().filter(p => p.destaque));

  constructor() {
    this.carregar();
  }

  carregar() {
    this.http.get<Product[]>(`${API_URL}/produtos`).subscribe({
      next: lista => {
        this.produtos.set(lista);
        this.erroApi.set(false);
      },
      error: () => this.erroApi.set(true),
    });
  }

  porId(id: number) {
    return this.vitrine().find(p => p.id === id);
  }

  criar(dados: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${API_URL}/produtos`, dados).pipe(tap(() => this.carregar()));
  }

  atualizar(id: number, dados: Omit<Product, 'id'>): Observable<Product> {
    return this.http.put<Product>(`${API_URL}/produtos/${id}`, { ...dados, id }).pipe(tap(() => this.carregar()));
  }

  ajustarEstoque(id: number, estoque: number): Observable<Product> {
    return this.http.patch<Product>(`${API_URL}/produtos/${id}`, { estoque }).pipe(tap(() => this.carregar()));
  }

  add(p: Omit<Product, 'id'>) {
    this.http.post<Product>(`${API_URL}/produtos`, p).subscribe(() => this.carregar());
  }

  remove(id: number) {
    this.http.delete(`${API_URL}/produtos/${id}`).subscribe(() => this.carregar());
  }
}
