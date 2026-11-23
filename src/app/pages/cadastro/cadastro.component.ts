import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-cadastro',
    imports: [FormsModule, RouterLink],
    standalone: true,
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
    @Output() fechar = new EventEmitter<void>();
    @Input() modoLogin = false;

    nome: string = '';
    email: string = '';
    senha: string = '';
    confirmarSenha: string = '';
    aceitouTermos: boolean = false;

    constructor(private router: Router) {}

    fecharTela(): void {
        this.fechar.emit();
        if (this.router.url.startsWith('/cadastro')) {
            this.router.navigate(['/']);
        }
    }

    mostrarLogin(): void {
        this.modoLogin = true;
    }

    mostrarCadastro(): void {
        this.modoLogin = false;
    }

    impedirEnvio(event: Event): void {
        // Os formulários ainda não estão conectados ao backend.
        // Isso evita que a página recarregue ao clicar nos botões.
        event.preventDefault();
    }

    validarEmail(): boolean {
        const regraEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regraEmail.test(this.email);
    }

    validarSenha(): boolean {
        // A senha deve ter pelo menos 8 caracteres.
        return this.senha.length >= 8;
    }

    entrar(): void {
        if (this.email === '') {
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
        this.fecharTela();
    }

    cadastrar(): void {
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

        alert('Cadastro preenchido corretamente!');
        this.mostrarLogin();
    }
}