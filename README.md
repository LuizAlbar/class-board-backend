# 📘 Class-Board – Documento de Requisitos (Checklist)

## 🟦 Sprint 01 — Autenticação, Sessões, RBAC e SaaS Core

### 🔷 Requisitos Funcionais
> **Foco:** Gestão de acesso e identidade do usuário.
- [x] Deve ser possível realizar cadastro de usuários (`Coordenação`, `Professor`, `Aluno` e `Responsável)`.
- [x] Deve ser possível autenticar usuários via e-mail e senha.
- [x] Deve ser possível recuperar a sessão do usuário via `Refresh Token`.
- [x] Deve ser possível recuperar os dados do usuário logado (**Perfil**).
- [x] Deve ser possível que cada usuário acesse apenas sua própria visão (**RBAC**).

### 🔶 Regras de Negócio

| Regra | Descrição |
| :--- | :--- |
| **E-mail Único** | Bloqueio de registros com e-mails já existentes na base. |
| **Multi-tenancy** | Isolamento lógico total de dados por **Organização**. |
| **Membership** | Vínculo entre usuário e organização que define a **Role** local. |
| **RBAC Contextual** | Validação de acesso baseada na Role ativa na organização atual. |

### 🟡 Requisitos Não Funcionais
- [x] API construída com Fastify e TypeScript com validação via Zod.
- [x] Validação estrita com Zod em 100% das rotas e variáveis de ambiente.
- [x] Senhas devem estar criptografadas com bcrypt.
- [x] Autenticação deve ser feita com JWT (access + refresh) usando cookies httpOnly.
- [x] Uso de Cookies httpOnly, Secure e SameSite: Strict para prevenção de XSS e CSRF.
- [x] Redis deve ser usado para armazenamento e controle de expiração de Refresh Tokens.
- [x] Modelagem utilizando Prisma ORM com PostgreSQL (tabelas de usuários, organizações e membros).
- [x] Implementação de @fastify/helmet e configuração de CORS estrito.
- [x] Padronização de código com Biome e Husky para hooks de pré-commit.
- [x] Deve existir rate limit global e em rotas críticas.
- [x] Backend deve seguir arquitetura Clean Code + DDD.
- [x] Swagger deve documentar a API.
- [x] Deve haver logs estruturados com Pino Logger.
- [x] Implementação de Graceful Shutdown e rota de Health Check.
- [x] Orquestração de serviços (API, Banco de Dados e Redis) rodando em containers via Docker e Docker Compose.

### 📚 Rotas Implementadas

#### 🔐 Autenticação & Sessão
> Rotas responsáveis pela gestão de identidade e segurança.

- `POST` **/auth/register**
  - *Registra um novo usuário na plataforma.*
- `POST` **/auth/authenticate**
  - *Autentica o usuário e injeta cookies HttpOnly.*
- `GET` **/auth/refresh-token**
  - *Renova o Access Token silenciosamente.*
- `PATCH` **/auth/organization**
  - *Troca o contexto da organização ativa no JWT.*
- `GET` **/auth/me**
  - *Recupera dados detalhados do perfil logado.*
---
#### 🛠 Infraestrutura & DX
- `GET` **/docs**
  - *Interface OpenAPI 3.0 para testes de rotas.*
- `GET` **/health**
  - *Status em tempo real: API, Postgres e Redis.*

