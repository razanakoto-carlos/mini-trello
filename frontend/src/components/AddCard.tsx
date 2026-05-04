export default function AddCard({
  show,
  value,
  onChange,
  onAdd,
  onCancel,
  onKeyDown,
}: any) {
  if (!show) {
    return (
      <button
        onClick={onAdd}
        className="w-full text-left text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded px-1 py-1.5 transition"
      >
        + Ajouter une carte
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        autoFocus
        rows={2}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Titre de la carte..."
        className="
          w-full bg-white rounded-sm px-3 py-2 text-sm
          text-gray-900 placeholder-gray-400
          border border-black/10 shadow-sm resize-none
          focus:outline-none
        "
      />

      <div className="flex gap-2 items-center">
        <button
          onClick={onAdd}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded"
        >
          Ajouter
        </button>

        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-800 text-sm"
        >
          ✕
        </button>
      </div>
    </div>
  );
}