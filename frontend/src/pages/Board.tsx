import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Column from "../components/Column";
import arrow from "../assets/arrow.svg";

type ColumnId = "todo" | "doing" | "done";

const COLUMN_LABELS = {
  todo: "À faire",
  doing: "En cours",
  done: "Terminé",
};

function Board() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [columns, setColumns] = useState({
    todo: [{ id: 1, text: "Créer la maquette" }],
    doing: [{ id: 2, text: "Implémenter l'auth" }],
    done: [{ id: 3, text: "Configurer Prisma" }],
  });

  const [newCard, setNewCard] = useState({
    todo: "",
    doing: "",
    done: "",
  });

  const [showInput, setShowInput] = useState({
    todo: false,
    doing: false,
    done: false,
  });

  const handleAddCard = (col: ColumnId) => {
    if (!newCard[col].trim()) return;

    const card = { id: Date.now(), text: newCard[col] };

    setColumns({
      ...columns,
      [col]: [...columns[col], card],
    });

    setNewCard({ ...newCard, [col]: "" });
    setShowInput({ ...showInput, [col]: false });
  };

  const handleDeleteCard = (col: ColumnId, id: number) => {
    setColumns({
      ...columns,
      [col]: columns[col].filter((c) => c.id !== id),
    });
  };

  const handleKeyDown = (e: any, col: ColumnId) => {
    if (e.key === "Enter") handleAddCard(col);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-800 via-blue-500 to-blue-300">
      <header className="flex items-center gap-4 px-4 py-2 bg-black/20">
        <button
          onClick={() => navigate("/")}
          className="text-white/70 hover:text-white hover:bg-white/20 p-1.5 rounded"
        >
          <img
            src={arrow}
            alt="arrow back"
            className="w-5 h-5 opacity-70 hover:opacity-100 transition"
          />
        </button>
        <h1 className="text-white font-bold">Board #{id}</h1>
      </header>

      <main className="flex gap-3 px-4 py-4 overflow-x-auto flex-1">
        {(["todo", "doing", "done"] as ColumnId[]).map((col) => (
          <Column
            key={col}
            col={col}
            label={COLUMN_LABELS[col]}
            cards={columns[col]}
            showInput={showInput[col]}
            newCard={newCard[col]}
            setNewCard={(v: string) => setNewCard({ ...newCard, [col]: v })}
            setShowInput={(v: boolean) =>
              setShowInput({ ...showInput, [col]: v })
            }
            handleAdd={handleAddCard}
            handleDelete={handleDeleteCard}
            handleKeyDown={(e: any) => handleKeyDown(e, col)}
          />
        ))}
      </main>
    </div>
  );
}

export default Board;
