import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="w-100 mx-auto" style={{ maxWidth: "420px" }}>
        <Outlet />
      </div>

    </div>
  );
};

export default AuthLayout;