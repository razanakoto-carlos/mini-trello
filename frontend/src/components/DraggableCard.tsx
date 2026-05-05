import { useDraggable } from "@dnd-kit/core";
import { Card } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "../service/api";

function DraggableCard({ card }: { card: Card }) {
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: card.id,
  });
  const isDragging = transform !== null;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCards"] });
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: transform
          ? `translate(${transform.x}px,${transform.y}px) scale(1.03)`
          : undefined,
        transition: isDragging ? "none" : "transform 200ms ease",
        opacity: isDragging ? 0.85 : 1,
        boxShadow: isDragging ? "0 10px 30px rgba(0,0,0,0.15)" : undefined,
        zIndex: isDragging ? 999 : undefined,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      className="
        bg-white rounded-sm px-3 py-2 shadow-sm
        flex items-start justify-between gap-2
        border border-black/10
        hover:bg-gray-50 group
      "
    >
      <span className="text-sm text-gray-800 leading-snug">{card.title}</span>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => mutate(card.id)}
        className="text-gray-300 hover:text-red-400 text-xs
                   opacity-0 group-hover:opacity-100 transition"
      >
        ✕
      </button>
    </div>
  );
}

export default DraggableCard;
