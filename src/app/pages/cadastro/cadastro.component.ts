import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cadastro',
    imports: [FormsModule, RouterLink],
    standalone: true,
    templateUrl: './cadastro.component.html',
    styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
    @Output() fechar = new EventEmitter<void>();
    modoLogin = false;

    fecharTela(){
        this.fechar.emit();
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

    nome: string = '';
    email: string = '';
    senha: string = '';
    confirmarSenha: string = '';
    aceitouTermos: boolean = false;

    validarEmail(): boolean {

        const regraEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regraEmail.test(this.email);

    }
    validarSenha(): boolean {
        // A senha deve ter pelo menos 8 caracteres.
        return this.senha.length >= 8;
    }
    entrar() {
        if (this.email === '') {
            alert("Por favor digite seu e-mail");
            return;
        }
        if (!this.validarEmail()) {
            alert("Por favor digite um e-mail válido");
            return;
        }
        if (this.senha === '') {
            alert("Por favor digite sua senha");
            return;
        }
        if (!this.validarSenha()) {
            alert("Por favor digite uma senha válida (mínimo 8 caracteres)");
            return;
        }
        console.log("Entrando com e-mail:", this.email, "e senha:", this.senha);
    }
    cadastrar() {

        this.nome = this.nome.trim();
        this.email = this.email.trim().toLowerCase();

        console.log("email cadastrado: ", this.email);
        
        // Verifica se o nome foi preenchido.
        if (this.nome.trim() === '') {
            alert("Por favor, digite seu nome");
            return;
        }

        // Verifica se o e-mail foi preenchido.
        if (this.email.trim() === '') {
            alert("Por favor, digite seu e-mail");
            return;
        }

        // Verifica se o e-mail possui formato válido.
        if (!this.validarEmail()) {
            alert("Por favor, digite um e-mail válido");
            return;
        }

        // Verifica se a senha foi preenchida.
        if (this.senha === '') {
            alert("Por favor, digite sua senha");
            return;
        }

        // Verifica se a senha possui pelo menos 8 caracteres.
        if (!this.validarSenha()) {
            alert("A senha precisa ter pelo menos 8 caracteres");
            return;
        }

        // Verifica se a confirmação da senha foi preenchida.
        if (this.confirmarSenha === '') {
            alert("Por favor, confirme sua senha");
            return;
        }

        // Verifica se as senhas são iguais.
        if (this.senha !== this.confirmarSenha) {
            alert("As senhas não correspondem");
            return;
        }

        if (!this.aceitouTermos) {
            alert("Você precisa aceitar os Termos de Uso para se cadastrar");
            return;
        }

        console.log("Nome:", this.nome);
        console.log("E-mail:", this.email);

        alert("Cadastro preenchido corretamente!");
    }
}
