import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Login } from './pages/login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  mostrarLogin = false;

  get noAdmin() {
    return this.router.url.startsWith('/admin');
  }

  abrirTelaLogin() {
    this.mostrarLogin = true;
  }

  fecharTelaLogin() {
    this.mostrarLogin = false;
  }
}