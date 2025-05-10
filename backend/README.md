# To-Do List Backend

Este é o backend do sistema de To-Do List com autenticação de usuários e gerenciamento de tarefas. O backend é construído com Node.js, TypeScript, Express, Prisma e PostgreSQL.

## 📦 Requisitos

- **Node.js** (versão 14 ou superior)
- **npm** (ou **yarn** como alternativa)
- **PostgreSQL** (ou outro banco de dados PostgreSQL em execução)

---

## 📁 Estrutura do Projeto

```yml
backend/
│   .env                         # Arquivo de configuração de variáveis de ambiente
│   .gitignore                   # Arquivo para ignorar arquivos/diretórios no controle de versão
│   package-lock.json            # Arquivo de bloqueio de dependências gerado pelo npm
│   package.json                 # Arquivo de configuração do projeto e dependências
│   README.md                    # Documentação do Backend
│   route-test.http              # Arquivo para testar rotas HTTP (usado com extensões como REST Client)
│   tsconfig.json                # Configuração do TypeScript
├───prisma/
│   │   schema.prisma            # Definição do esquema do banco de dados para o Prisma
│   └───migrations/              # Diretório contendo as migrações do banco de dados
└───src/
    │   index.ts                 # Arquivo principal para inicialização do servidor
    │   server.ts                # Configuração do servidor Express
    ├───controllers/
    │       authController.ts    # Controlador para lógica de autenticação
    │       taskController.ts    # Controlador para lógica de gerenciamento de tarefas
    ├───middleware
    │       authMiddleware.ts    # Middleware para autenticação e autorização
    ├───routes
    │       authRoutes.ts        # Rotas relacionadas à autenticação
    │       taskRoutes.ts        # Rotas relacionadas ao gerenciamento de tarefas
    └───types/express/index.d.ts # Definições de tipos personalizados para o Express
```

---

## ⚙️ Instalação, configuração e Execução

### Passo 1: Clonando o Repositório

Clone o repositório para a sua máquina e navegue para o backend:

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>/backend
```

### Passo 2: Instalando Dependências

Dentro do diretório do projeto, instale as dependências do projeto usando o npm ou yarn:

```bash
npm install
```

Ou, caso prefira o yarn:

```bash
yarn install
```

### Passo 3: Configuração do Banco de Dados

1. Crie um banco de dados no PostgreSQL. Se você estiver utilizando o pgAdmin ou a linha de comando, crie um banco de dados chamado `todo_list` (ou o nome que preferir).
2. Configure o arquivo `.env` para definir variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente:

```plaintext
DATABASE_URL=postgresql://usuario:senha@localhost:5432/todo_list?schema=public
JWT_SECRET=sua_chave_secreta_segura
```
- `DATABASE_URL`: A URL de conexão do banco de dados PostgreSQL.
    - Substitua `usuario`, `senha` e `localhost` pelas suas credenciais do banco de dados.
    - O nome do banco de dados `todo_list` deve ser o mesmo nome criado anteriormente.
- `JWT_SECRET`: Será a sua chave secreta usada para assinar e verificar tokens JWT. Certifique-se de usar uma chave forte e segura.

3. Rode as migrações do Prisma para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev --name init
```

Verifique se as tabelas estão criadas no banco de dados PostgreSQL (`User` e `Task`).

### Passo 4: Inicializando o Servidor

Depois de configurar as dependências e o banco de dados, você pode iniciar o servidor. Execute o comando abaixo:

```bash
npm run dev
```

Ou, se preferir, use:

```bash
yarn dev
```

O servidor irá rodar na porta definida no arquivo `.env` (por padrão, `3000`, caso não seja especificado).

--- 

## 🌐 Endpoints

### 🛡️ Autenticação de Usuário

#### Registrar Usuário

**POST** `/auth/register`

**Corpo:**

```json
{
    "email": "user@example.com",
    "password": "senha123"
}
```

**Resposta:**

```json
{
    "id": "uuid_do_usuario",
    "email": "user@example.com"
}
```

#### Login de Usuário

**POST** `/auth/login`

**Corpo:**

```json
{
    "email": "user@example.com",
    "password": "senha123"
}
```

**Resposta:**

```json
{
    "token": "jwt_token_aqui"
}
```

> **Nota:** O token JWT gerado no login deve ser incluído nas requisições seguintes para autenticação.

### ✅ Tarefas (Tasks)

#### Criar uma Tarefa

**POST** `/tasks`

- Requer autenticação (token JWT).

**Corpo:**

```json
{
    "title": "Tarefa de teste",
    "description": "Descrição da tarefa"
}
```

**Resposta:**

```json
{
    "id": "uuid_da_tarefa",
    "title": "Tarefa de teste",
    "description": "Descrição da tarefa",
    "userId": "uuid_do_usuario"
}
```

#### Buscar Todas as Tarefas

**GET** `/tasks`

- Requer autenticação (token JWT).
- Retorna todas as tarefas associadas ao usuário autenticado.

**Resposta:**

```json
[
    {
        "id": "uuid_da_tarefa",
        "title": "Tarefa de teste",
        "description": "Descrição da tarefa"
    },
    {
        "id": "uuid_da_tarefa_2",
        "title": "Outra tarefa",
        "description": "Descrição de outra tarefa"
    }
]
```

#### Buscar Uma Tarefa Específica

**GET** `/tasks/:id`

- Requer autenticação (token JWT).
- Retorna uma tarefa específica baseada no `id` fornecido.

**Resposta:**

```json
{
    "id": "uuid_da_tarefa",
    "title": "Tarefa de teste",
    "description": "Descrição da tarefa"
}
```

#### Atualizar uma Tarefa

**PUT** `/tasks/:id`

- Requer autenticação (token JWT).

**Corpo:**

```json
{
    "title": "Tarefa Atualizada",
    "description": "Descrição atualizada",
    "done": true
}
```

**Resposta:**

```json
{
    "id": "uuid_da_tarefa",
    "title": "Tarefa Atualizada",
    "description": "Descrição atualizada",
    "done": true
}
```

#### Deletar uma Tarefa

**DELETE** `/tasks/:id`

- Requer autenticação (token JWT).

**Resposta:**

```json
{}
```
---
## 🧪 Testando a API

Você pode testar a API utilizando o Postman ou a extensão REST Client no VSCode via arquivo `route-test.http`. Para realizar as requisições, inclua o token JWT obtido durante o login no cabeçalho das requisições.

**Exemplo de Cabeçalho com Token JWT:**

```plaintext
Authorization: Bearer <seu_token_jwt_aqui>
```