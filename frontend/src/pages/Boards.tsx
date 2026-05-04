import { useState } from "react";
import Header from "../components/Header";
import BoardCard from "../components/BoardCard";
import CreateBoardForm from "../components/CreateBoardForm";

interface Board {
  id: number;
  name: string;
}

function Boards() {
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, name: "Mon premier board" },
    { id: 2, name: "Projet personnel" },
  ]);
  const [boardTitle, setBoardTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleCreate = () => {
    if (!boardTitle.trim()) return;
    const newBoard: Board = { id: Date.now(), name: boardTitle.trim() };
    setBoards([...boards, newBoard]);
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
      <div className="flex items-center gap-2 px-6 py-3 text-white/90 text-sm font-medium">
        Mes boards
      </div>
      <main className="px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-w-5xl">
          {boards.map((board) => (
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
              className="h-24 rounded-md px-3 pt-3 text-left bg-white/15 hover:bg-white/25 transition-all duration-150 "
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
