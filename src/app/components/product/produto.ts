import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [],
  templateUrl: './produto.html',
  styleUrl: './produto.css'
})
export class Produto {
  @Input() produto: any;
  @Output() fechar = new EventEmitter<void>();

  voltar() {
    this.fechar.emit();
  }
}