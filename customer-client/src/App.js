import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./pages/MainLayout";
import { useStateContext } from "./context/StateContext";

function App() {
  const { isLogin } = useStateContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          {isLogin ? (
            <>
              <Route path="/*" element={<MainLayout />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" index element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
