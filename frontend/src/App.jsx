import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GuestRoute } from "./components/GuestRoute";
import { AuthLoader } from "./components/AuthLoader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Boards from "./pages/Boards";
import Board from "./pages/Board";

function App() {
  return (
    <Routes>
      <Route element={<AuthLoader />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Boards />} />
          <Route path="/board/:id"  element={<Board />} />
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
