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
        console.log("Fetch list & Card : ",cards);
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
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8">

      {/* ── Header ── */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Mini Trello
          </h1>
        </div>
        <img
          src={ImgLog}
          alt="LogOut"
          className="w-8 cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-200"
          onClick={handleLogOut}
        />
      </div>

      {/* ── Colonnes ── */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {lists.map((list) => (
          <div
            key={list.id}
            className="bg-white/5 border border-white/10 backdrop-blur-md w-72 rounded-2xl p-4 shadow-md min-h-[120px] flex-shrink-0 hover:border-white/20 transition-all duration-200"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(list.id)}
          >
            {/* Titre colonne */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400" />
                <h2 className="text-white font-semibold text-sm tracking-wide">
                  {list.title}
                </h2>
              </div>
              <span className="bg-white/10 text-white/40 text-xs font-semibold px-2 py-0.5 rounded-full">
                {list.cards.length}
              </span>
            </div>

            {/* Cartes */}
            <div className="space-y-2">
              {list.cards.map((card: Card) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card.id, list.id)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-white/80 text-sm cursor-grab active:cursor-grabbing transition-colors duration-150"
                >
                  <span className="text-white/20 text-xs">⠿</span>
                  {card.title}
                </div>
              ))}

              {/* Colonne vide */}
              {list.cards.length === 0 && (
                <div className="text-center text-white/20 text-xs border-2 border-dashed border-white/10 rounded-xl py-6">
                  Dépose une carte ici
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;