import { useNavigate } from "react-router-dom";

type Board = {
  id: number;
  name: string;
};

type Props = {
  board: Board;
  onDelete?: (id: number) => void;
};

export default function BoardCard({ board, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <div className="
        relative h-24 rounded-md px-3 pt-3 text-left
        bg-white/30 hover:bg-white/40
        transition-all duration-150 active:scale-95
      "
    >
      <button
        onClick={() => navigate(`/board/${board.id}`)}
        className="w-full h-full text-left"
      >
        <span className="text-white font-semibold text-sm line-clamp-2 leading-snug">
          {board.name}
        </span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(board.id);
        }}
        className="
          absolute top-2 right-2
          text-white/60 hover:text-red-400
          hover:bg-white/20
          rounded p-1
          transition
        "
      >
        ✕
      </button>
    </div>
  );
}