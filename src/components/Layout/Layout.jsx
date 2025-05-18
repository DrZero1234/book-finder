import { Outlet } from "react-router";
import "./Layout.scss";
import { Navbar } from "../Navbar/Navbar";

export const Layout = () => {
  return (
    <>
      <div className="page--wrapper">
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <div className="container">Footer</div>
        </footer>
      </div>
    </>
  );
};
