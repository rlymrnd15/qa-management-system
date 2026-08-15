import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Projects from "./pages/Projects";
import Workspace from "./pages/Workspace";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Projects */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        {/* Workspace */}
        <Route
          path="/workspace/:game/:platform"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />

        {/* Workspace Pages */}
        <Route
          path="/workspace/:game/:platform/:page"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />

        {/* Unknown route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;