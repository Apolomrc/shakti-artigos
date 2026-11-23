import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-estoque',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './estoque.html',
  styleUrl: './estoque.css',
})
export class Estoque {
  service = inject(ProductService);
  categorias = ['Japamalas', 'Pulseiras', 'Fios de Pedras', 'Fio de Cristal', 'Anéis', 'Colares'];

  form = this.novoForm();

  private novoForm() {
    return { nome: '', categoria: 'Japamalas', preco: 0, estoque: 0, descricao: '', imagem: '' };
  }

  adicionar() {
    if (!this.form.nome.trim() || this.form.preco <= 0) return;
    this.service.add({
      ...this.form,
      descricao: this.form.descricao || 'Peça feita com pedras naturais selecionadas.',
      imagem: this.form.imagem || 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500',
    });
    this.form = this.novoForm();
  }

  remover(id: number, nome: string) {
    if (confirm(`Remover "${nome}"?`)) this.service.remove(id);
  }
}