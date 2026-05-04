# Nexboard

Une application Kanban full-stack construite avec React, Node.js et Prisma — inspirée de Trello, conçue pour évoluer avec l'intégration d'agents MCP.

---

## Stack Technique

| Couche           | Technologie                                      |
|------------------|--------------------------------------------------|
| Frontend         | React 18, TypeScript, Tailwind CSS               |
| État             | Zustand (auth), TanStack Query (données serveur) |
| Backend          | Node.js, Express, TypeScript                     |
| Base de données  | PostgreSQL via Prisma ORM                        |
| Authentification | JWT                                              |

---

## Démarrage

### Prérequis

- Node.js >= 18
- PostgreSQL en cours d'exécution en local
- Un fichier `.env` dans `/backend` (voir `.env.example`)

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application tourne sur `http://localhost:5173` — API sur `http://localhost:3000`.

---

## Structure du Projet

nexboard/
├── backend/
│   ├── src/
│   │   ├── controllers/     # board, card
│   │   ├── routes/          # board, card
│   │   ├── middleware/      # auth (JWT)
│   │   ├── validations/     # boardSchema, cardSchema (Zod)
│   │   └── server.ts
│   └── prisma/
│       └── schema.prisma
│
└── frontend/
├── src/
│   ├── components/
│   ├── pages/           # Login, Register
│   ├── store/           # authStore (Zustand)
│   ├── service/         # api
│   └── main.tsx

---

## Variables d'Environnement

Crée un fichier `.env` dans `/backend` :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nexboard"
JWT_SECRET="ta_clé_secrète"
PORT=3000
```

---

## Licence

MIT