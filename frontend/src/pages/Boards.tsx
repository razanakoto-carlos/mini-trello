import { useState, useRef, useEffect } from "react";
import ImgLog from "../assets/logout.svg";
import { useNavigate } from "react-router-dom";
import { fetchLists, fetchCards, moveCard } from "../service/api";
import type { ListWithCards, Card } from "../types";

function Boards() {
  const navigate = useNavigate();

  // ─── Les vraies listes avec leurs cartes ──────────────────
  // [] au départ → rempli après l'appel API
  const [lists, setLists] = useState<ListWithCards[]>([]);

  // ─── Post-it du drag & drop ───────────────────────────────
  const dragInfo = useRef({ cardId: 0, fromListId: 0 });

  // ─── Au démarrage : charger les listes + cartes ───────────
  useEffect(() => {
    loadBoard();
  }, []); // ← [] = "une seule fois au démarrage"

  const loadBoard = async () => {
    // 1. On récupère les listes du board (id=1 pour l'instant)
    const listsData = await fetchLists(1);

    // 2. Pour chaque liste, on récupère ses cartes
    const listsWithCards: ListWithCards[] = await Promise.all(
      listsData.map(async (list: ListWithCards) => {
        const cards = await fetchCards(list.id);
        return { ...list, cards }; // ← on colle les cartes dans la liste
      })
    );

    setLists(listsWithCards);
  };

  // ─── Drag Start : on mémorise la carte et sa liste ────────
  const handleDragStart = (cardId: number, fromListId: number) => {
    dragInfo.current = { cardId, fromListId };
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // ─── Drop : on déplace la carte visuellement + en base ────
  const handleDrop = async (toListId: number) => {
    const { cardId, fromListId } = dragInfo.current;

    if (fromListId === toListId) return;

    // 1. Mise à jour visuelle immédiate (sans attendre le serveur)
    setLists((prev) =>
      prev.map((list) => {
        // On retire la carte de sa liste d'origine
        if (list.id === fromListId) {
          return {
            ...list,
            cards: list.cards.filter((c: Card) => c.id !== cardId),
          };
        }
        // On ajoute la carte dans la liste de destination
        if (list.id === toListId) {
          const card = prev
            .find((l) => l.id === fromListId)
            ?.cards.find((c: Card) => c.id === cardId);
          return {
            ...list,
            cards: card ? [...list.cards, card] : list.cards,
          };
        }
        return list;
      })
    );

    // 2. On sauvegarde en base de données
    await moveCard(cardId, toListId);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{ background: "linear-gradient(to right, #68C9A7, #4FC0A4)" }}
    >
      <h1 className="flex justify-between text-2xl font-bold text-white mb-6">
        Mini Trello
        <img
          src={ImgLog}
          alt="LogOut"
          className="w-8 cursor-pointer hover:opacity-60 transition"
          onClick={handleLogOut}
        />
      </h1>

      <div className="flex gap-6 overflow-x-auto">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-gray-100 w-72 rounded-lg p-4 shadow-md min-h-[100px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(list.id)}
          >
            <h2 className="font-semibold mb-4">{list.title}</h2>

            <div className="space-y-3">
              {list.cards.map((card: Card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card.id, list.id)}
                  className="bg-white p-3 rounded shadow cursor-grab active:cursor-grabbing"
                >
                  {card.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;