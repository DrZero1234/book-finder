import { MoonLoader } from "react-spinners";
import "./LoadingSpinner.scss";
import { Children } from "react";

export const LoadingSpinner = ({ children }) => {
  return (
    <div className="spinner--overlay">
      <MoonLoader
        color="#f18e7d"
        style={{
          zIndex: "2000",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
      <span className="loading--spinner--label">{children}</span>
    </div>
  );
};
