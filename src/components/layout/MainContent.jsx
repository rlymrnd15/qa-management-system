import Dashboard from "../workspace/Dashboard";
import TestCases from "../workspace/TestCases";
import BugReports from "../workspace/BugReports";
import DeviceMatrix from "../workspace/DeviceMatrix";


function MainContent({ activePage }) {

  const pages = {
    dashboard: <Dashboard />,
    testcases: <TestCases />,
    bugreports: <BugReports />,
    devicematrix: <DeviceMatrix />,
  };


  return (
    <main className="flex-1 bg-slate-50 p-8">
      {pages[activePage]}
    </main>
  );
}


export default MainContent;