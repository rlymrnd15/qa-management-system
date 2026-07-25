import {
  LayoutDashboard,
  ClipboardCheck,
  Bug,
  Smartphone,
  ArrowLeft,
  Gamepad2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar({ game, platform, activePage, setActivePage }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Test Cases",
      icon: ClipboardCheck,
    },
    {
      name: "Bug Reports",
      icon: Bug,
    },
    {
      name: "Device Matrix",
      icon: Smartphone,
    },
  ];

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r bg-white">

      {/* Header */}
      <div className="border-b p-6">

        <div className="flex items-center gap-2">
          <Gamepad2 className="text-blue-600" size={28} />

          <h1 className="text-xl font-bold">
            Game QA Hub
          </h1>
        </div>


        {/* Project Info */}
        <div className="mt-8 rounded-xl bg-slate-100 p-4">

          <p className="text-sm text-slate-500">
            Current Project
          </p>

          <h2 className="mt-1 text-lg font-semibold capitalize">
            {game.replace(/-/g, " ")}
          </h2>


          <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 capitalize">
            {platform}
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

                const page = item.name
                .toLowerCase()
                .replace(" ", "");

                return (
                <button
                    key={item.name}
                    onClick={() => setActivePage(page)}
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
                        activePage === page
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    }
                    `}
                >

                    <Icon size={20}/>

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

          <ArrowLeft size={20}/>

          Back to Projects

        </button>

      </div>


    </aside>
  );
}

export default Sidebar;