import { useQuery } from "@tanstack/react-query";
import { Card } from "../types";
import DraggableCard from "./DraggableCard";
import { getCard } from "../service/api";

export default function CardItem({
  listId,
  emptySlot = false,
}: {
  listId: number;
  emptySlot?: boolean;
}) {
  const { data: cards, isLoading } = useQuery({
    queryFn: () => getCard(listId),
    queryKey: ["getCards", listId],
  });
  const isEmpty = !isLoading && (!cards || cards.length === 0);
  return (
    <>
      {isLoading && <p className="text-xs text-gray-400">Chargement...</p>}

      {cards?.map((card: Card) => (
        <DraggableCard card={card} key={card.id} />
      ))}

      {isEmpty && !emptySlot && (
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md py-4 text-gray-400 text-xs">
          ── Aucune carte ──
        </div>
      )}

      {emptySlot && (
        <div className="flex items-center justify-center border-2 border-dashed border-blue-300 bg-blue-50 rounded-md py-6 text-blue-400 text-xs transition-all duration-150">
          Déposer ici
        </div>
      )}
    </>
  );
}
