import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, CadastroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mostrarAutenticacao: boolean = false;

  abrirAutenticacao() {
    this.mostrarAutenticacao = true;
  }

  fecharAutenticacao() {
    this.mostrarAutenticacao = false;
  }
}