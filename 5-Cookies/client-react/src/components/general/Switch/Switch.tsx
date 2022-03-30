import React, { FC } from "react";
import { DataHook } from "../../../interfaces/interfaces";

const Switch: FC<{
  cb: () => void;
  checked: boolean;
  dataHook: DataHook;
}> = ({ cb, checked = false, dataHook }) => {
  return (
    <label className="switch">
      <input
        data-hook={dataHook}
        type="checkbox"
        checked={checked}
        onClick={cb}
        onChange={() => (checked = !checked)}
      />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;
