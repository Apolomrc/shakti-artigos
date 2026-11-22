import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class AdminLogin {
  email = '';
  senha = '';

  constructor(private router: Router) {}

  entrar() {
    if (this.email && this.senha) {
      alert('Login administrativo realizado com sucesso!');
    } else {
      alert('Preencha todos os campos.');
    }
  }
}