# 🚚 PS5 Transportes

![GitHub repo size](https://img.shields.io/github/repo-size/PIE-Transportadores/PS5-Transportes?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/PIE-Transportadores/PS5-Transportes?style=for-the-badge)

> Sistema de gerenciamento de transportadoras desenvolvido com Next.js, Prisma e PostgreSQL.

## 📋 Pré-requisitos

Antes de começar, verifique se você possui:

- Node.js v18+
- npm ou Yarn
- PostgreSQL ou MySQL
- Git

## 🚀 Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/PIE-Transportadores/PS5-Transportes.git
cd PS5-Transportes

# Instale as dependências
npm install

# Configure o arquivo .env (copie o .env.example)
cp .env.example .env

# Gere o cliente do Prisma
npx prisma generate

# Execute o projeto
npm run dev
