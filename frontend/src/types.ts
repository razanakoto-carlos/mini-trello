export type List = {
  id: number;
  title: string;
};

export type Card = {
  id: number;
  title: string;
};

export type ListWithCards = List & {
  cards: Card[];
};

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface authStore {
  user: User | null;
  isAuthenticated:boolean
  setAuth: (user:User) => void
  clearAuth: ()=> void
}

export interface Board {
  id: number;
  title: string;
}