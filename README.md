# Investidores.vc – Backend

Este é o backend da aplicação **Investidores.vc**, construído com foco em **boas práticas**, **limpeza de código** e **estrutura escalável**. Ele fornece uma API RESTful para gerenciamento de startups, autenticação de usuários e integração com chatbot.

---

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** – framework Node.js com arquitetura modular
- **[Prisma ORM](https://www.prisma.io/)** – ORM para banco de dados relacional
- **SQLite** (dev local) / **PostgreSQL** (produção)
- **JWT** – autenticação com tokens
- **bcryptjs** – criptografia de senhas
- **@nestjs/axios** – para consumir APIs externas (webhooks/chatbot)
- **@nestjs/schedule** – tarefas agendadas (cron jobs)

---

## 📦 Funcionalidades

### 🔐 Autenticação
- Cadastro e login com **e-mail e senha** (`/auth/register`, `/auth/login`)
- Registro via **OAuth simulada** (`/auth/oauth-register`)
- Senhas criptografadas com `bcrypt`
- Tokens JWT gerados e retornados

### 🚀 Startups
- CRUD completo de startups:
  - Criar: `POST /startup`
  - Listar todas: `GET /startup`
  - Buscar por ID: `GET /startup/:id`
  - Atualizar: `PATCH /startup/:id`
  - Deletar: `DELETE /startup/:id`
- Tratamento de erros com `NotFoundException`
- Campos padrão para imagem, localização e vertical, caso ausentes

### 💬 Chatbot
- Rota: `GET /chatbot?mensagem=...`
- Acessa dados reais da API externa:  
  `https://make.investidores.vc/webhook/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups`
- Retorna startups baseadas em:
  - Nome
  - Vertical (ex: "fintech")
  - Localização (ex: "São Paulo")

### ⏱️ Cron Job
- Exemplo de tarefa agendada a cada 5 segundos (usando `@Cron`)
- Rota `/` retorna "API DAS STARTUPS"

---

## 🌍 Hospedagem em produção
A aplicação está hospedada na Railway:

https://backend-production-e7e3.up.railway.app/
---

## 🛠 Como rodar localmente

```bash
# Instale as dependências
npm install

# Rode as migrations
npx prisma migrate dev

# Inicie o servidor
npm run start:dev
