# To-Do List – Projeto Fullstack

Este repositório contém a aplicação **To-Do List**, dividida em duas partes principais:

- **Frontend**: Interface do usuário construída com **React** e **TypeScript**.
- **Backend**: API REST com autenticação e gerenciamento de tarefas, construída com **Node.js**, **TypeScript**, **Express**, **Prisma** e **PostgreSQL**.

---

## 📁 Estrutura do Projeto

```
to-do-list/
│
├── backend/         # API e lógica do servidor
│   └── README.md
│
├── frontend/        # Interface do usuário (SPA)
│   └── README.md
│
└── README.md        # Este arquivo
```

---

## Funcionalidades

- Cadastro e login de usuários com autenticação via JWT.
- Criação, visualização, atualização e remoção de tarefas.
- Interface responsiva para interação com as tarefas.
- Proteção de rotas e persistência de login no frontend.

---

## Tecnologias Utilizadas

### Backend

- Node.js + Express
- TypeScript
- Prisma (ORM)
- PostgreSQL (BD)
- JWT para autenticação

### Frontend

- React + Material UI
- TypeScript
- Vite
- Axios

---

## ⚙️ Como Executar Localmente

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd to-do-list
```

### 2. Backend

```bash
cd backend
npm install
# ou
yarn install

# Configure o .env conforme o exemplo no README do backend
# Execute as migrações do banco
npx prisma migrate dev --name init

# Inicie o servidor
npm run dev
```

### 3. Frontend

Abra um novo terminal:

```bash
cd frontend
npm install
# ou
yarn install

# Inicie o frontend
npm run dev
```

O frontend estará disponível geralmente em `http://localhost:5173` e o backend em `http://localhost:3000`.

---

## Notas

- Certifique-se de que o banco de dados PostgreSQL esteja em execução.
- O frontend se comunica com o backend via Axios, verifique se as URLs estão corretas nas variáveis de ambiente ou configuração.
- Consulte os READMEs individuais em `/frontend` e `/backend` para mais detalhes de cada parte.
