import { useNavigate, useParams } from "react-router-dom";
import arrow from "../assets/arrow.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBoard, moveCard } from "../service/api";
import { List } from "../types";
import { DndContext,DragEndEvent } from "@dnd-kit/core";
import DroppableList from "../components/DroppableList";


function Board() {
  const navigate = useNavigate();
  const { id } = useParams();
  const boardId = parseInt(id!);
  const { data: boards } = useQuery({
    queryFn: () => getBoard(boardId!),
    queryKey: ["board", boardId],
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: moveCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCards"] });
    },
  });

  function handleDragEnd(event:DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    mutate({
      cardId: active.id as number,
      listId: over.id as number,
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-blue-800 via-blue-500 to-blue-300">
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
        <div className="w-px h-5 bg-white/20" />
        <h1 className="text-white font-semibold text-sm tracking-wide">
          {boards?.title ?? "Chargement..."}
        </h1>
      </header>
      <DndContext onDragEnd={handleDragEnd}>
        <main className="flex gap-3 px-4 py-4 overflow-x-auto flex-1">
          {boards &&
            boards.lists.map((list: List) => (
              <DroppableList list={list} key={list.id} />
            ))}
        </main>
      </DndContext>
    </div>
  );
}

export default Board;
