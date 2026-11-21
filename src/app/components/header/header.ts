import { Component, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Output() abrirLogin = new EventEmitter<void>();

  constructor(private router: Router) {}

  clicouLogin() {
    this.abrirLogin.emit();
  }

  filtrarCategoria(cat: string) {
    this.router.navigate(['/produtos'], { queryParams: { categoria: cat } });
  }
}