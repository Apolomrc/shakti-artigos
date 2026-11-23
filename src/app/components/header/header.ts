import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private router = inject(Router);
  cart = inject(CartService);
  auth = inject(AuthService);

  @Output() abrirLogin = new EventEmitter<void>();

  buscaAberta = signal(false);
  termo = '';

  clicouLogin() {
    this.abrirLogin.emit();
  }

  sair() {
    this.auth.sair();
    this.router.navigateByUrl('/');
  }

  alternarBusca() {
    this.buscaAberta.update(v => !v);
  }

  buscar() {
    const termo = this.termo.trim();
    if (!termo) return;
    this.router.navigate(['/produtos'], { queryParams: { busca: termo } });
    this.termo = '';
    this.buscaAberta.set(false);
  }
}
