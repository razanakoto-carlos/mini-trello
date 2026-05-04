type CreateBoardFormProps = {
  value: string;
  setValue: (value: string) => void;
  onCreate: () => void;
  onCancel: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
};
export default function CreateBoardForm({
  value,
  setValue,
  onCreate,
  onCancel,
  onKeyDown,
}: CreateBoardFormProps) {
  return (
    <div className="h-10 rounded-md px-3 py-2 flex flex-col gap-2 bg-white/30">
      <input
        autoFocus
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Nom du board"
        className="w-full bg-white rounded px-2 py-1 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <div className="flex gap-2 items-center">
        <button
          onClick={onCreate}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded"
        >
          Créer
        </button>

        <button
          onClick={onCancel}
          className="text-white/70 hover:text-white text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
