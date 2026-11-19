import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  @Output() fechar = new EventEmitter<void>();

  voltar() {
    this.fechar.emit();
  }
}