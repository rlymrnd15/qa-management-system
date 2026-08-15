import {
  LayoutDashboard,
  ClipboardCheck,
  Bug,
  Smartphone,
  ArrowLeft,
  Gamepad2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { formatGameName } from "../../utils/formatGameName";

import { useAuth } from "../../context/AuthContext";

function Sidebar({
  game,
  platform,
  activePage,
  setActivePage,
}) {

  const { role } = useAuth();

  const isDev = role?.toLowerCase() === "dev";
  const roleLabel = isDev ? "DEV Account" : "QA Account";


  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      page: "dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Test Cases",
      page: "testcases",
      icon: ClipboardCheck,
    },
    {
      name: "Bug Reports",
      page: "bugreports",
      icon: Bug,
    },
    {
      name: "Device Matrix",
      page: "devicematrix",
      icon: Smartphone,
    },
  ];

  const platformName =
    {
      ios: "iOS",
      android: "Android",
      amazon: "Amazon",
    }[platform] || platform;

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r bg-white">

      {/* Header */}
      <div className="border-b p-6">

        <div className="flex items-center gap-2">
          <Gamepad2
            className="text-blue-600"
            size={28}
          />

          <h1 className="text-xl font-bold">
            Game QA Hub
          </h1>
        </div>
        
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-100 p-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            {isDev ? "D" : "Q"}
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {roleLabel}
            </p>

            <p className="text-xs text-slate-500">
              {isDev
                ? "Developer access"
                : "QA access"}
            </p>
          </div>

        </div>


        {/* Project Info */}
        <div className="mt-8 rounded-xl bg-slate-100 p-4">

          <p className="text-sm text-slate-500">
            Current Project
          </p>

          <h2 className="mt-1 text-lg font-semibold">
            {formatGameName(game)}
          </h2>

          <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            {platformName}
          </span>

        </div>

      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase text-slate-400">
          Workspace
        </p>

        <div className="space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.page}
                onClick={() =>
                  setActivePage(item.page)
                }
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  transition
                  ${
                    activePage === item.page
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                <Icon size={20} />

                <span>
                  {item.name}
                </span>
              </button>
            );
          })}

        </div>

      </nav>

      {/* Bottom */}
      <div className="border-t p-4">

        <button
          onClick={() => navigate("/")}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-slate-600
            transition
            hover:bg-slate-100
          "
        >
          <ArrowLeft size={20} />

          Back to Projects

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;