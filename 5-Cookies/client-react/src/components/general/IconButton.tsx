import React, { FC } from "react";

const IconButton: FC<{
  cb: () => void;
  icon: string;
  className: string;
  dataHook: string;
}> = ({ cb, icon, className, dataHook }) => {
  return (
    <button className={className} onClick={cb} data-hook={dataHook}>
      <i className={icon} />
    </button>
  );
};

export default IconButton;
