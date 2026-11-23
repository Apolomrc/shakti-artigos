import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './api';

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  criadoEm?: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);

  buscarPorEmail(email: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${API_URL}/clientes`, { params: { email } });
  }

  cadastrar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_URL}/clientes`, {
      ...cliente,
      criadoEm: new Date().toISOString(),
    });
  }
}
