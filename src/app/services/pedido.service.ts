import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './api';

export type StatusPedido = 'pago' | 'aguardando_pix' | 'enviado' | 'aguardando_boleto' | 'entregue';

export interface ItemPedido {
  nome: string;
  quantidade: number;
  preco: number;
}

export interface Pedido {
  id: string;
  cliente: string;
  email?: string;
  data: string;
  total: number;
  status: StatusPedido;
  itens: ItemPedido[];
}

export const STATUS_PEDIDO: Record<StatusPedido, string> = {
  pago: 'Pago',
  aguardando_pix: 'Aguardando Pix',
  enviado: 'Enviado',
  aguardando_boleto: 'Aguardando boleto',
  entregue: 'Entregue',
};

export const moeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private http = inject(HttpClient);

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${API_URL}/pedidos`);
  }
}
