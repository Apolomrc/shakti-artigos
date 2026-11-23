import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, CadastroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  mostrarAutenticacao = false;

  get noAdmin() {
    return this.router.url.startsWith('/admin');
  }

  abrirAutenticacao() {
    this.mostrarAutenticacao = true;
  }

  fecharAutenticacao() {
    this.mostrarAutenticacao = false;
  }
}