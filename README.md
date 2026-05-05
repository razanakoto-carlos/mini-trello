# Nexboard

Une application Kanban full-stack construite avec React, Node.js et Prisma — inspirée de Trello, conçue pour évoluer avec l'intégration d'agents MCP.

![Board View](./screenshots/boards.png)
![Drag & Drop](./screenshots/moveCard.png)

---

## Stack Technique

| Couche           | Technologie                                      |
|------------------|--------------------------------------------------|
| Frontend         | React 18, TypeScript, Tailwind CSS               |
| État             | Zustand (auth), TanStack Query (données serveur) |
| Drag & Drop      | dnd-kit                                          |
| Backend          | Node.js, Express, TypeScript                     |
| Base de données  | PostgreSQL via Prisma ORM                        |
| Authentification | JWT + cookies httpOnly                           |

---

## Fonctionnalités

- Authentification sécurisée (JWT + cookies httpOnly)
- Création et suppression de boards
- 3 listes créées automatiquement à la création d'un board
- Gestion des cartes (CRUD complet)
- Drag & drop fluide entre les colonnes
- Mises à jour optimistes avec TanStack Query
- Gestion de l'état global avec Zustand

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

## Variables d'Environnement

Crée un fichier `.env` dans `/backend` :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/nexboard"
JWT_SECRET="ta_clé_secrète"
PORT=3000
NODE_ENV="development"
```

---

## Structure du Projet

```
nexboard/
├── backend/
│   ├── src/
│   │   ├── controllers/     # board, card, auth
│   │   ├── routes/          # board, card, auth
│   │   ├── middleware/      # auth (JWT + cookie)
│   │   ├── validations/     # schemas Joi
│   │   └── server.ts
│   └── prisma/
│       └── schema.prisma
│
└── frontend/
    └── src/
        ├── components/
        ├── pages/           # Login, Register, Boards
        ├── routes/          # ProtectedRoute, GuestRoute
        ├── store/           # authStore (Zustand)
        ├── service/         # api (Axios)
        └── main.tsx
```

---

## Licence

MIT