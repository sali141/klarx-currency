import React, { memo } from "react";
import loader from "../../assets/img/loading.gif";
import "./Loader.scss";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default memo(Loader);
