# Rapidinha

Plataforma de vídeos curtos, no estilo do YouTube Shorts. Trabalho da disciplina Programação para Web (UFRRJ).

## Telas

- Cadastro e login
- Feed de vídeos com busca por título
- Página do vídeo
- Enviar vídeo (vídeo + thumbnail) - obrigatório a thumbnail por enquanto
- Meus vídeos
- Listar usuários (só admin)

## Tecnologias

- AdonisJS 7
- Lucid (ORM) com SQLite
- Edge (templates)
- VineJS (validação)

## Como rodar

Precisa do Node 24 ou mais novo.

```bash
npm install
cp .env.example .env
node ace generate:key
node ace migration:run
npm run dev
```

Depois é só abrir http://localhost:3333.

## Admin

Para um usuário acessar as telas de admin, coloque `is_admin = 1` na tabela `users` do banco (`tmp/db.sqlite3`).
