<div align="center">

# SumaryYoutube

**Transforme vídeos longos em conhecimento em segundos.**  
Uma plataforma fullstack com IA que converte conteúdo do YouTube em resumos inteligentes e mapas mentais visuais.

[![C#](https://img.shields.io/badge/C%23-ASP.NET_Core-512BD4?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/)
[![Python](https://img.shields.io/badge/Python-FastAPI-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-React-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

</div>

---

## Sobre o Projeto

O **SumaryYoutube** nasce de um problema real: vivemos com excesso de conteúdo em vídeo e falta de tempo para consumi-lo com eficiência.

A plataforma recebe vídeos ou canais do YouTube, extrai transcrições automaticamente, aplica tratamento inteligente quando não há legenda no idioma desejado e utiliza IA generativa para gerar resumos claros e objetivos — organizados visualmente em mapas mentais dinâmicos.

> Em vez de gastar horas assistindo conteúdo, o usuário extrai o que importa em minutos.

---

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🎥 **Extração de transcrições** | Busca automática de legendas via YouTube Transcript API e YoutubeExplode |
| 🌍 **Fallback multilíngue** | Tradução inteligente quando não há legenda no idioma desejado |
| 🤖 **Resumo com IA** | Geração de resumos claros e objetivos via Google Gemini |
| 🧠 **Mapas mentais** | Visualização dinâmica do conteúdo com Mermaid.js |
| 🔐 **Autenticação segura** | Controle de acesso com JWT |

---

## Arquitetura

O projeto foi construído com uma **arquitetura distribuída**, separando responsabilidades entre serviços especializados.

```
┌─────────────────────────────────────────────────────────┐
│                        Frontend                         │
│             Next.js · React · TypeScript · Tailwind     │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                  Backend Principal                      │
│          C# · ASP.NET Core · Entity Framework           │
│     Regras de negócio · Autenticação JWT · Orquestração │
└──────────────┬──────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────┐
│               Microsserviço Python                      │
│                   FastAPI                               │
│     Extração de transcrições · Tratamento de dados      │
└──────────────┬──────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────────┐
│              Dados & Infraestrutura                     │
│             PostgreSQL · Docker                         │
└─────────────────────────────────────────────────────────┘
```

### Stack Completa

**Frontend**
- Next.js · React · TypeScript · TailwindCSS · Mermaid.js

**Backend**
- C# · ASP.NET Core · Entity Framework Core

**Microsserviço**
- Python · FastAPI · YouTube Transcript API · YoutubeExplode

**IA & Dados**
- Google Gemini · PostgreSQL

**Infraestrutura**
- Docker

---

## Decisões Técnicas

**Por que C# + Python?**  
Cada tecnologia foi escolhida onde faz mais sentido. O .NET gerencia as regras de negócio e a camada de segurança com robustez, enquanto o Python lida com extração e manipulação de dados externos — onde seu ecossistema é imbatível.

**Por que microsserviços?**  
A separação permite que cada parte da aplicação escale de forma independente e seja substituída sem impacto no restante do sistema.

**Por que Mermaid.js?**  
Transforma texto bruto gerado pela IA em informação visual de alto valor, sem dependência de serviços externos de renderização de diagramas.

---

## Diferenciais

Este projeto vai muito além de um CRUD tradicional:

- Integração com múltiplas APIs externas
- Processamento e tratamento de dados externos
- IA generativa com saída estruturada
- Tratamento de falhas com fallback automático
- Autenticação e segurança com JWT
- Banco de dados relacional (PostgreSQL)
- Containerização completa com Docker
- Arquitetura distribuída e escalável

---

## Impacto

| Antes | Depois |
|---|---|
| Horas assistindo vídeos | Minutos lendo resumos |
| Conteúdo linear e difuso | Informação estruturada visualmente |
| Barreira de idioma | Tradução automática com fallback |
| Dificuldade para revisar | Mapas mentais prontos para consulta |

---

<div align="center">

**SumaryYoutube** · Software Engineering + Inteligência Artificial + Produtividade

</div>
