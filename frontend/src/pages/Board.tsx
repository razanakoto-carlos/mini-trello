import { useNavigate, useParams } from "react-router-dom";
import arrow from "../assets/arrow.svg";
import CardItem from "../components/CardItem";
import AddCard from "../components/AddCard";
import { useQuery } from "@tanstack/react-query";
import { getBoard } from "../service/api";
import { List } from "../types";

function Board() {
  const navigate = useNavigate();
  const { id } = useParams();
  const boardId = parseInt(id!);
  const { data: boards } = useQuery({
    queryFn: () => getBoard(boardId!),
    queryKey: ["board", boardId],
  });
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
      <main className="flex gap-3 px-4 py-4 overflow-x-auto flex-1">
        {boards &&
          boards.lists.map((list: List) => (
            <div
              className="w-64 min-w-64 bg-gray-100 rounded-md flex flex-col shrink-0 "
              key={list.id}
            >
              <div className="px-3 pt-3 pb-2">
                <h2 className="text-sm font-semibold text-gray-800">
                  {list.title}
                </h2>
              </div>

              <div className="flex flex-col gap-2 px-2">
                <CardItem listId={list.id} />
              </div>
              <div className="px-2 py-2">
                <AddCard listId={list.id} />
              </div>
            </div>
          ))}
      </main>
    </div>
  );
}

export default Board;
