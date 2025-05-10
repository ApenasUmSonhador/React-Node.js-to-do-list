# To-Do List Frontend

Este é o frontend do sistema de To-Do List com autenticação de usuários e gerenciamento de tarefas. O frontend é construído com React, TypeScript e Material UI (MUI), consumindo a API do backend para gerenciamento de autenticação e tarefas.

## 📦 Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Backend rodando localmente em `VITE_API_URL`
---

## 📁 Estrutura do Projeto

```yml
frontend/
│   package.json              # Configuração do projeto e dependências
│   tsconfig.json             # Configuração do TypeScript
│   .gitignore                # Ignora arquivos para controle de versão
│   README.md                 # Documentação do Frontend
├───public/                   # Arquivos públicos estáticos
│   index.html
└───src/
  │   main.tsx                # Ponto de entrada da aplicação
  │   App.tsx                 # Componente principal com as rotas
  ├───pages/
  │   │   Login.tsx           # Página de login
  │   │   Register.tsx        # Página de registro
  │   │   Home.tsx            # Página principal com as tarefas
  ├───components/
  │   │   TaskForm.tsx        # Componente para cadastro de novas tarefas
  │   │   TaskList.tsx        # Componente para exibição da lista de tarefas
  │   │   TaskItem.tsx        # Componente para exibição de item de tarefas
  ├───contexts/
  │   │   AuthContext.tsx     # Contexto para autenticação de usuário
  ├───types/
  │   │   task.ts             # Tipagem para tarefas
  └───services/
    │   auth.ts               # Serviços para autenticação (token, logout, etc.)
```

---

## ⚙️ Instalação e Execução

### Passo 1: Clonando o Repositório

Clone o repositório e navegue até o diretório do frontend:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>/frontend
```

### Passo 2: Execute o que se pede no backend
Leia e execute o que se pede no backend para evitar conflitos

### Passo 3: Instalando as Dependências do frontend

Navegue para a pasta do projeto frontend e utilize o npm ou yarn para instalar os pacotes do projeto:

```bash
npm install
```

Ou, se preferir:

```bash
yarn install
```

### Passo 3: Inicializando a Aplicação

Execute o projeto localmente com o comando:

```bash
npm run dev
```

Ou:

```bash
yarn dev
```

A aplicação será iniciada em `http://localhost:5173` (por padrão com Vite), podendo ser acessada por qualquer navegador.

**Nota:** Certifique-se de que o backend esteja em execução em `VITE_API_URL` ou ajuste as URLs das requisições no frontend conforme necessário.

---

## 🚀 Funcionalidades

- Registro de novo usuário
- Login e armazenamento do token JWT
- Criação de tarefas com título e descrição
- Listagem de todas as tarefas do usuário
- Marcar/desmarcar tarefa como concluída
- Exclusão de tarefas
- Edição de tarefas
- Logout (limpa o token e redireciona para login)

## 🛡️ Autenticação

A autenticação é feita via JWT (JSON Web Token). O token é gerado pelo backend durante o login e armazenado no `localStorage` do navegador. Ele é utilizado para validar as requisições autenticadas, sendo enviado no cabeçalho HTTP:

```
Authorization: Bearer <token>
```

### Fluxo de Autenticação

1. **Registro:** O usuário cria uma conta fornecendo os dados necessários.
2. **Login:** O backend valida as credenciais e retorna um token JWT.
3. **Armazenamento:** O token é salvo no `localStorage` para persistência.
4. **Requisições:** O token é incluído automaticamente nas requisições protegidas.
5. **Logout:** O token é removido do `localStorage`, encerrando a sessão.

**Nota:** Certifique-se de proteger o token contra acessos não autorizados e ataques XSS.Autenticação

## 🔑 Componentes Importantes

- **Login.tsx:** Tela de login com autenticação via backend.
- **Register.tsx:** Tela para cadastro de novo usuário.
- **Home.tsx:** Página principal que lista, cria, atualiza e deleta tarefas.
- **TaskItem.tsx:** Componente que representa uma tarefa individual.
- **auth.ts:** Funções auxiliares como logout e verificação de token.
