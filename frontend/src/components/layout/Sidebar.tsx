import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Datasets", path: "/datasets" },
  { name: "Analytics", path: "/analytics" },
  { name: "ML Models", path: "/ml" },
  { name: "AI Insights", path: "/ai-insights" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/10 bg-[#0d0d0d] p-6">
      <h1 className="mb-10 text-2xl font-bold">
        Data<span className="text-cyan-400">Pilot</span>
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block w-full rounded-lg px-4 py-3 ${
                isActive
                  ? "bg-cyan-400/10 text-cyan-400"
                  : "text-gray-400 hover:bg-white/5"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;