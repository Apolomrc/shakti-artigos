import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

/** Painel lateral do carrinho. Aberto pelo header e fechado pelo overlay ou pelo botão. */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  cart = inject(CartService);
  private router = inject(Router);

  moeda(valor: number) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  fechar() {
    this.cart.fechar();
  }

  finalizar() {
    this.cart.fechar();
    this.router.navigateByUrl('/checkout');
  }

  continuar() {
    this.cart.fechar();
  }
}
