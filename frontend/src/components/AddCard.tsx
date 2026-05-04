import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createCard } from "../service/api";

export default function AddCard({ listId }: { listId: number }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCards"] });
    },
  });
  if (!show) {
    return (
      <button
        onClick={() => setShow(true)}
        className="w-full text-left text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded px-1 py-1.5 transition"
      >
        + Ajouter une carte
      </button>
    );
  }
  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    mutate({ title, listId });
    setTitle("");
    setShow(false);
  }
  return (
    <form onSubmit={handleForm} className="flex flex-col gap-2">
      <textarea
        autoFocus
        rows={2}
        placeholder="Titre de la carte..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="
          w-full bg-white rounded-sm px-3 py-2 text-sm
          text-gray-900 placeholder-gray-400
          border border-black/10 shadow-sm resize-none
          focus:outline-none
        "
      />

      <div className="flex gap-2 items-center">
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold rounded-md shadow-sm transition-all duration-150"
        >
          Ajouter
        </button>
        <button
          onClick={() => setShow(false)}
          className="px-2 py-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 text-sm rounded-md transition-all duration-150"
        >
          ✕
        </button>
      </div>
    </form>
  );
}
