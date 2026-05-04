
export type Board = {
  id: number;
  title: string;
  userId: number;
};

export type List = {
  id: number;
  title: string;
  boardId: number;
};

export type Card = {
  id: number;
  title: string;
  listId: number;
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
