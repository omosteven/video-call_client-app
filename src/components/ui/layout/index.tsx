import "./Layout.scss";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props: { children?: ReactNode }) => {
  const { children } = props;

  const { pathname } = useLocation();
  const path = pathname.substring(1);
  const showLayout =
    path.includes("signup") || path.includes("login") || path === "";

  return (
    <>
      {!showLayout ? (
        <>
          <div className="layout">
            <main>
              <div className="main-inner">{children}</div>
            </main>
          </div>
        </>
      ) : (
        <> {children}</>
      )}
      <ToastContainer />
    </>
  );
};

export default Layout;
