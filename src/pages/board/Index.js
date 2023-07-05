import { Outlet } from "react-router-dom";

function Index() {
  return (
    <div className="page-container">
      <div className="layout-center">
        <div>BoardHome</div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export { Index };
