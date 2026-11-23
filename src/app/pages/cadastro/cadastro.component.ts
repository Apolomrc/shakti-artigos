import { Component, EventEmitter, OnDestroy, Output, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, RouterLink],
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnDestroy {
  private auth = inject(AuthService);
  private clientes = inject(ClienteService);
  private router = inject(Router);
  private timer: ReturnType<typeof setTimeout> | null = null;

  @Output() fechar = new EventEmitter<void>();

  modoLogin = false;

  /** Estado da animação de sucesso: null quando não há nada sendo exibido. */
  sucesso = signal<{ titulo: string; texto: string } | null>(null);

  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  aceitouTermos: boolean = false;

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  fecharTela() {
    this.fechar.emit();
  }

  mostrarLogin(): void {
    this.modoLogin = true;
  }

  mostrarCadastro(): void {
    this.modoLogin = false;
  }

  impedirEnvio(event: Event): void {
    event.preventDefault();
  }

  validarEmail(): boolean {
    const regraEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regraEmail.test(this.email);
  }

  validarSenha(): boolean {
    return this.senha.length >= 8;
  }

  entrar() {
    if (this.email.trim() === '') {
      alert('Por favor digite seu e-mail');
      return;
    }
    if (!this.validarEmail()) {
      alert('Por favor digite um e-mail válido');
      return;
    }
    if (this.senha === '') {
      alert('Por favor digite sua senha');
      return;
    }
    if (!this.validarSenha()) {
      alert('Por favor digite uma senha válida (mínimo 8 caracteres)');
      return;
    }

    const email = this.email.trim().toLowerCase();
    this.clientes.buscarPorEmail(email).subscribe({
      next: lista => {
        if (lista.length === 0) {
          alert('Não encontramos uma conta com este e-mail. Crie sua conta.');
          return;
        }
        this.auth.entrar(lista[0]);
        this.concluir({
          titulo: `Bem-vindo de volta, ${lista[0].nome.split(' ')[0]}!`,
          texto: 'Login realizado com sucesso.',
        });
      },
      error: () => alert('Não foi possível conectar ao servidor. Confira se a API está rodando (npm run api).'),
    });
  }

  cadastrar() {
    this.nome = this.nome.trim();
    this.email = this.email.trim().toLowerCase();

    if (this.nome === '') {
      alert('Por favor, digite seu nome');
      return;
    }
    if (this.email === '') {
      alert('Por favor, digite seu e-mail');
      return;
    }
    if (!this.validarEmail()) {
      alert('Por favor, digite um e-mail válido');
      return;
    }
    if (this.senha === '') {
      alert('Por favor, digite sua senha');
      return;
    }
    if (!this.validarSenha()) {
      alert('A senha precisa ter pelo menos 8 caracteres');
      return;
    }
    if (this.confirmarSenha === '') {
      alert('Por favor, confirme sua senha');
      return;
    }
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não correspondem');
      return;
    }
    if (!this.aceitouTermos) {
      alert('Você precisa aceitar os Termos de Uso para se cadastrar');
      return;
    }

    this.clientes.buscarPorEmail(this.email).subscribe({
      next: lista => {
        if (lista.length > 0) {
          alert('Já existe uma conta com este e-mail. Entre na sua conta.');
          return;
        }
        this.clientes.cadastrar({ nome: this.nome, email: this.email }).subscribe({
          next: cliente => {
            this.auth.entrar(cliente);
            this.concluir({
              titulo: 'Conta criada com sucesso!',
              texto: `Bem-vinda(o) à Shakti Artigos, ${cliente.nome.split(' ')[0]}.`,
            });
          },
          error: () => alert('Não foi possível criar sua conta. Confira se a API está rodando (npm run api).'),
        });
      },
      error: () => alert('Não foi possível conectar ao servidor. Confira se a API está rodando (npm run api).'),
    });
  }

  /** Mostra a animação de sucesso, fecha o modal e leva o usuário para a home. */
  private concluir(mensagem: { titulo: string; texto: string }) {
    this.sucesso.set(mensagem);
    this.timer = setTimeout(() => {
      this.sucesso.set(null);
      this.fechar.emit();
      this.router.navigateByUrl('/');
    }, 2000);
  }
}
