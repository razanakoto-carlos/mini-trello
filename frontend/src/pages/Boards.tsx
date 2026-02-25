import ImgLog from "../assets/logout.svg";
import { useNavigate } from "react-router-dom";

function Boards() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

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
        <div className="bg-gray-100 w-72 rounded-lg p-4 shadow-md">
          <h2 className="font-semibold mb-4">Todo</h2>

          {/* Cards */}
          <div className="space-y-3">
            <div className="bg-white p-3 rounded shadow">Setup project</div>
            <div className="bg-white p-3 rounded shadow">Create login page</div>
          </div>
        </div>

        {/* List 2 */}
        <div className="bg-gray-100 w-72 rounded-lg p-4 shadow-md">
          <h2 className="font-semibold mb-4">Doing</h2>

          <div className="space-y-3">
            <div className="bg-white p-3 rounded shadow">Build board UI</div>
          </div>
        </div>

        {/* List 3 */}
        <div className="bg-gray-100 w-72 rounded-lg p-4 shadow-md">
          <h2 className="font-semibold mb-4">Done</h2>

          <div className="space-y-3">
            <div className="bg-white p-3 rounded shadow">Register page</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boards;
