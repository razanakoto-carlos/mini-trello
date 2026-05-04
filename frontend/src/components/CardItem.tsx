import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "../types";
import { deleteCard, getCard } from "../service/api";

export default function CardItem({ listId }: { listId: number }) {
  const queryClient = useQueryClient();
  const { data: cards, isLoading } = useQuery({
    queryFn: () => getCard(listId),
    queryKey: ["getCards", listId],
  });
  const { mutate } = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCards"] });
    },
  });
  return (
    <>
      {isLoading && <p>Chargement...</p>} <p></p>
      {cards &&
        cards.map((card: Card) => (
          <div
            key={card.id}
            className="
        bg-white rounded-sm px-3 py-2 shadow-sm
        flex items-start justify-between gap-2
        border border-black/10
        hover:bg-gray-50 transition cursor-pointer
        group
      "
          >
            <span className="text-sm text-gray-800 leading-snug">
              {card.title}
            </span>

            <button
              onClick={() => mutate(card.id)}
              className="
          text-gray-300 hover:text-red-400 text-xs
          opacity-0 group-hover:opacity-100 transition
        "
            >
              ✕
            </button>
          </div>
        ))}
    </>
  );
}
