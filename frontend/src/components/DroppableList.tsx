import { useDroppable } from "@dnd-kit/core";
import { List } from "../types";
import AddCard from "./AddCard";
import CardItem from "./CardItem";

function DroppableList({ list }: { list: List }) {
  const { setNodeRef, isOver } = useDroppable({
    id: list.id,
  });
  return (
    <div
      ref={setNodeRef}
      className={`
    w-72 min-w-72 rounded-lg p-4 shadow-md flex flex-col shrink-0
    transition-all duration-150
    ${isOver ? "bg-blue-100 ring-2 ring-blue-300 min-h-[160px]" : "min-h-[100px] bg-gray-100"}
  `}
    >
      <div className="mb-4">
        <h2 className="font-semibold text-gray-800">{list.title}</h2>
      </div>

      <div className="space-y-3 flex-1">
        <CardItem listId={list.id} emptySlot={isOver} />
      </div>

      <div className="mt-3">
        <AddCard listId={list.id} />
      </div>
    </div>
  );
}

export default DroppableList;
