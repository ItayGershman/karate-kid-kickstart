import React, { FC } from "react";
import { DataHook } from "../../../interfaces/interfaces";

const IconButton: FC<{
  cb: () => void;
  icon: string;
  className: string;
  dataHook: DataHook;
}> = ({ cb, icon, className, dataHook }) => {
  return (
    <button className={className} onClick={cb} data-hook={dataHook}>
      <i className={icon} />
    </button>
  );
};

export default IconButton;
