import AddCard from "./AddCard";
import CardItem from "./CardItem";

export default function Column({
  col,
  label,
  cards,
  showInput,
  newCard,
  setNewCard,
  setShowInput,
  handleAdd,
  handleDelete,
  handleKeyDown,
}: any) {
  return (
    <div className="w-64 min-w-64 bg-gray-100 rounded-md flex flex-col shrink-0">
      
      <div className="px-3 pt-3 pb-2">
        <h2 className="text-sm font-semibold text-gray-800">
          {label}
        </h2>
      </div>

      <div className="flex flex-col gap-2 px-2">
        {cards.map((card: any) => (
          <CardItem
            key={card.id}
            card={card}
            onDelete={() => handleDelete(col, card.id)}
          />
        ))}
      </div>

      <div className="px-2 py-2">
        <AddCard
          show={showInput}
          value={newCard}
          onChange={(e: any) => setNewCard(e.target.value)}
          onAdd={() => handleAdd(col)}
          onCancel={() => setShowInput(false)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}