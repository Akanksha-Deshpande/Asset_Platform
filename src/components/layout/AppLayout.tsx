import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="min-vh-100 bg-light">

      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="container py-4">
        <Outlet />
      </main>

    </div>
  );
};

export default AppLayout;