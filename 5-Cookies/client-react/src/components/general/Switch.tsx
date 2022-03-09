import React from "react";

const Switch = ({ cb, checked }: { cb: () => void; checked: boolean }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onClick={cb} />
      <span className="slider round"></span>
    </label>
  );
};

export default Switch;
