import React, { FC } from "react";

const Switch: FC<{
  cb: () => void;
  checked: boolean;
  dataHook: string;
}> = ({ cb, checked = false, dataHook }) => {
  return (
    <label className="switch" data-hook={dataHook}>
      <input
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
