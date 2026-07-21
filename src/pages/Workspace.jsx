import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import MainContent from "../components/layout/MainContent";

function Workspace() {
  const { game, platform } = useParams();

  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        game={game}
        platform={platform}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <MainContent activePage={activePage} />
    </div>
  );
}

export default Workspace;