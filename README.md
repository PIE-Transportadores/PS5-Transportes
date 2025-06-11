# PS5 Transportes

Sistema de gerenciamento de transportadoras.

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/PIE-Transportadores/PS5-Transportes
```

### 2. Acesse a pasta do projeto

```bash
cd PS5-Transportes
```

### 3. Instale as dependências do projeto

```bash
npm install
```

### 4. Crie o arquivo `.env` na raiz do projeto

Esse arquivo deve conter a chave de autenticação do banco de dados. Exemplo:

```env
DATABASE_URL="..."
```
#### Atenção o arquivo "env" deve ser renomeado para ".env"


### 5. Instale as dependências do Prisma

```bash
npx prisma generate
npm install @prisma/client
npm install prisma --save-dev
```

### 6. Rode o projeto localmente em terminais diferentes

**Terminal 1:**

```bash
npm run dev
```

**Terminal 2:**

```bash
npx prisma studio
```

---

## 🧾 Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL

---

## 📂 Estrutura principal

- `prisma/` — esquemas do banco de dados
- `src/` — código-fonte da aplicação
- `.env` — variáveis de ambiente
- `package.json` — gerenciador de pacotes e scripts

---

## ✅ Comandos úteis

| Comando                     | Descrição                                         |
|----------------------------|---------------------------------------------------|
| `npm install`              | Instala as dependências do projeto                |
| `npm run dev`              | Executa o servidor em modo de desenvolvimento     |
| `npx prisma generate`      | Gera o client do Prisma após alterações no schema |
| `npx prisma studio`        | Abre o painel visual para visualizar o banco      |

---

## 📄 Licença

Este projeto está sob licença MIT.
