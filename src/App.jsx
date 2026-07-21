import { BrowserRouter, Routes, Route } from "react-router-dom";
import Projects from "./pages/Projects";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route
          path="/workspace/:game/:platform"
          element={<Workspace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;