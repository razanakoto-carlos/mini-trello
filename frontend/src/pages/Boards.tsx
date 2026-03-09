import { useState } from "react";
import ImgLog from "../assets/logout.svg";
import { useNavigate } from "react-router-dom";

const initialColumns = {
  todo: {
    title: "Todo",
    cards: ["Setup project", "Create Login Page"],
  },
  doing: {
    title: "Doing",
    cards: ["Build Board UI"],
  },
  done: {
    title: "Done",
    cards: ["Register Page"],
  },
};

function Boards() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const [columns, setColumns] = useState(initialColumns);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(to right, #68C9A7, #4FC0A4)",
      }}
    >
      {/* Board Title */}
      <h1 className="flex justify-between text-2xl font-bold text-white mb-6">
        Mini Trello
        <div>
          <img
            src={ImgLog}
            alt="LogOut"
            className="w-8 cursor-pointer hover:opacity-60 transition"
            onClick={handleLogOut}
          />
        </div>
      </h1>

      {/* Lists Container */}
      <div className="flex gap-6 overflow-x-auto">
        {/* List 1 */}
        {Object.entries(columns).map(([colId, column]) => (
          <div
            key={colId}
            className="bg-gray-100 w-72 rounded-lg p-4 shadow-md"
          >
            <h2 className="font-semibold mb-4">{column.title}</h2>

            {/* Cards */}
            <div className="space-y-3">
              {column.cards.map((card, index) => (
                <div key={index} className="bg-white p-3 rounded shadow">
                  {card}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Boards;
