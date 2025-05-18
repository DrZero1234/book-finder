import { Outlet, Link } from "react-router-dom";

export const BookLayout = () => {
  return (
    <div className="container">
      <Link to=".." relative="path">
        Back
      </Link>
      <Outlet />
    </div>
  );
};
