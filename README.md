# Investidores.vc – Backend

Este é o backend da aplicação Investidores.vc, desenvolvido com **NestJS**, **Prisma ORM** e banco de dados **SQLite**. Ele oferece uma API REST para gerenciar startups, usuários, autenticação, favoritos e investimentos.

---


## 📦 Tecnologias

- [x] NestJS
- [x] Prisma ORM
- [x] SQLite (desenvolvimento local)
- [x] PostgreSQL (produção na Railway)
- [x] JWT para autenticação
- [x] Agendamento com `@nestjs/schedule`

---

## 🔐 Funcionalidades principais

- **Cadastro e login de usuários**
  - Via email e senha
  - Via conta Google

- **CRUD de startups**
  - Criar, editar, listar, excluir startups

- **Favoritar startups**
  - Marcar/desmarcar como favorita
  - Relacionado ao usuário logado

- **Listagem com dados formatados**
  - O backend já retorna os campos esperados no frontend:  
    `nome_da_startup`, `descricao`, `imagem_de_capa`, `vertical`, `localizacao`, `cresimento_mom`

- **Investimentos**
  - Estrutura já pronta para registro de investimentos futuros

- **Rota de healthcheck**
  - `GET /ping` retorna `pong`

- **Cron job (desenvolvimento)**
  - Executado a cada 5 segundos para manter a aplicação acordada no Render

---

## 🌍 Hospedagem em produção
A aplicação está hospedada na Railway:

https://ivc-backend-production-d747.up.railway.app/
---

## 🛠 Como rodar localmente

```bash
# Instale as dependências
npm install

# Rode as migrations
npx prisma migrate dev

# Inicie o servidor
npm run start:dev
