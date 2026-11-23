import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { Cart } from './components/cart/cart';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, CadastroComponent, Cart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);
  cart = inject(CartService);

  mostrarAutenticacao = false;
  mostrarTopo = signal(false);

  @HostListener('window:scroll')
  aoRolar() {
    this.mostrarTopo.set(window.scrollY > 600);
  }

  subirAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

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