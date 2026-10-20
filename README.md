# Shakti Artigos

Loja virtual de artigos esotéricos, como japamalas, pulseiras e fios de pedras naturais e cristais.

Projeto em desenvolvimento, feito como primeiro projeto de loja em produção.

## Tecnologias

**Front-end**
- Angular
- TypeScript
- CSS

**Back-end (em desenvolvimento)**
- Java 21
- Spring Boot
- PostgreSQL

**Integrações e infraestrutura**
- Asaas (pagamentos: Pix, boleto e cartão)
- Cloudflare Pages (hospedagem do front)
- Docker (back-end e banco)

## Status

- [x] Telas do protótipo (Figma)
- [x] Estrutura inicial do projeto Angular
- [ ] Menu inicial
- [ ] Produto, carrinho e checkout
- [ ] Painel administrativo
- [ ] API em Spring Boot
- [ ] Integração com o Asaas

## Como rodar localmente

Pré-requisitos: Node.js (versão LTS) e npm.

```bash
cd app1
npm install
npm start
```

Depois, acesse `http://localhost:4200` no navegador.

## Estrutura

```
app1/
├── src/
│   ├── app/          # Componentes, páginas e rotas
│   ├── index.html    # Página base
│   └── styles.css    # Estilos globais
└── public/           # Arquivos estáticos
```

## Segurança

Credenciais e chaves de API não ficam no repositório. Elas são lidas de variáveis de ambiente, e o arquivo `.env` local está no `.gitignore`.
