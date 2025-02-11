import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar, { SideBarItem } from "./Sidebar/Sidebar";
import {
  LifeBuoy,
  LogOut,
  CircleDollarSign,
  PiggyBank,
  CreditCard,
  LayoutDashboard,
  Settings,
} from "lucide-react";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="flex ">
      <Sidebar>
        <SideBarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          isActive={location.pathname === "/dashboard"}
          onClick={() => navigate("/dashboard")}
        />
        <SideBarItem
          icon={<CircleDollarSign size={20} />}
          text="Income"
          isActive={location.pathname === "/dashboard/income"}
          onClick={() => navigate("/dashboard/income")}
        />
        <SideBarItem
          icon={<CreditCard size={20} />}
          text="Expenses"
          isActive={location.pathname === "/dashboard/expense"}
          onClick={() => navigate("/dashboard/expense")}
        />
        <SideBarItem
          icon={<PiggyBank size={20} />}
          text="Budget"
          isActive={location.pathname === "/dashboard/budget"}
          onClick={() => navigate("/dashboard/budget")}
        />
        <hr className="my-3" />
        <SideBarItem icon={<Settings size={20} />} text="Setting" />
        <SideBarItem icon={<LifeBuoy size={20} />} text="Help" />
        <SideBarItem
          icon={<LogOut size={20} />}
          text="Logout"
          onClick={handleLogout}
        />
      </Sidebar>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
