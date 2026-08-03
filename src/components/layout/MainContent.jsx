import Dashboard from "../workspace/Dashboard";
import TestCases from "../workspace/TestCases";
import BugReports from "../workspace/BugReports";
import DeviceMatrix from "../workspace/DeviceMatrix";


function MainContent({
  activePage,
  game,
  platform,
}) {

  const pages = {
    dashboard: (
      <Dashboard
        game={game}
        platform={platform}
      />
    ),

    testcases: (
      <TestCases
        game={game}
        platform={platform}
      />
    ),

    bugreports: (
      <BugReports
        game={game}
        platform={platform}
      />
    ),

    devicematrix: (
      <DeviceMatrix
        game={game}
        platform={platform}
      />
    ),
  };


  return (
    <main className="flex-1 bg-slate-50 p-8">
      {pages[activePage]}
    </main>
  );
}


export default MainContent;