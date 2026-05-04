interface Card {
  id: number;
  text: string;
}

export default function CardItem({
  card,
  onDelete,
}: {
  card: Card;
  onDelete: () => void;
}) {
  return (
    <div
      className="
        bg-white rounded-sm px-3 py-2 shadow-sm
        flex items-start justify-between gap-2
        border border-black/10
        hover:bg-gray-50 transition cursor-pointer
        group
      "
    >
      <span className="text-sm text-gray-800 leading-snug">
        {card.text}
      </span>

      <button
        onClick={onDelete}
        className="
          text-gray-300 hover:text-red-400 text-xs
          opacity-0 group-hover:opacity-100 transition
        "
      >
        ✕
      </button>
    </div>
  );
}