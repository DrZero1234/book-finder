import { Outlet } from "react-router-dom";
import "./Layout.scss";
import { Navbar } from "../Navbar/Navbar";
import { Suspense } from "react";

export const Layout = () => {
  return (
    <>
      <div className="page--wrapper">
        <header>
          <Navbar />
        </header>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
        <footer>
          <div className="container">Footer</div>
        </footer>
      </div>
    </>
  );
};
