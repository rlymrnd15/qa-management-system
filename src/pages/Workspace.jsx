import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import MainContent from "../components/layout/MainContent";

function Workspace() {
  const { game, platform, page } = useParams();

  const navigate = useNavigate();

  // Convert URL page → internal page name
  const pageMap = {
    dashboard: "dashboard",
    "test-cases": "testcases",
    "bug-reports": "bugreports",
    "device-matrix": "devicematrix",
  };

  // Convert internal page → URL page
  const urlPageMap = {
    dashboard: "dashboard",
    testcases: "test-cases",
    bugreports: "bug-reports",
    devicematrix: "device-matrix",
  };

  const activePage =
    pageMap[page] || "dashboard";

  useEffect(() => {
    if (!page) {
      navigate(
        `/workspace/${game}/${platform}/dashboard`,
        { replace: true }
      );
    }
  }, [
    page,
    game,
    platform,
    navigate,
  ]);

  const setActivePage = (newPage) => {
    const urlPage =
      urlPageMap[newPage] || "dashboard";

    navigate(
      `/workspace/${game}/${platform}/${urlPage}`
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar
        game={game}
        platform={platform}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <MainContent
        activePage={activePage}
        game={game}
        platform={platform}
      />

    </div>
  );
}

export default Workspace;