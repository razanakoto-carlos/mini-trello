import { useState } from "react";
import Header from "../components/Header";
import BoardCard from "../components/BoardCard";
import CreateBoardForm from "../components/CreateBoardForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBoard, getBoards } from "../service/api";
import { Board } from "../types";

function Boards() {
  const [boardTitle, setBoardTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBoards"] });
    },
  });

  const {
    data: boards,
    isLoading,
    error,
  } = useQuery({
    queryFn: getBoards,
    queryKey: ["getBoards"],
  });

  const handleCreate = () => {
    if (!boardTitle.trim()) return;
    mutate(boardTitle.trim());
    setBoardTitle("");
    setShowInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") {
      setShowInput(false);
      setBoardTitle("");
    }
  };

return (
  <div className="min-h-screen bg-linear-to-br from-blue-800 via-blue-500 to-blue-300">
    <Header />

    <div className="flex items-center gap-2 px-6 py-4 text-white font-semibold text-base tracking-wide">
      Mes boards
    </div>

    {isLoading && (
      <div className="flex items-center gap-2 px-6 py-3 text-white/70 text-sm">
        Chargement....
      </div>
    )}

    <main className="px-6 py-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl">
        {boards &&
          boards.map((board: Board) => (
            <BoardCard key={board.id} board={board} />
          ))}
        {showInput ? (
          <CreateBoardForm
            value={boardTitle}
            setValue={setBoardTitle}
            onCreate={handleCreate}
            onCancel={() => {
              setShowInput(false);
              setBoardTitle("");
            }}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="
              h-24 rounded-xl px-3 pt-3 text-left
              bg-white/10 hover:bg-white/20 backdrop-blur-sm
              border-2 border-dashed border-white/30 hover:border-white/50
              transition-all duration-150 active:scale-95
            "
          >
            <span className="text-white/80 text-sm">+ Créer un board</span>
          </button>
        )}
      </div>
    </main>
  </div>
);
}

export default Boards;
