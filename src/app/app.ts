import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  mostrarLogin = false;

  abrirTelaLogin() {
    this.mostrarLogin = true;
  }

  fecharTelaLogin() {
    this.mostrarLogin = false;
  }
}