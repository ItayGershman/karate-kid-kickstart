import React from "react";

const Switch = ({
  cb,
  checked = false,
}: {
  cb: () => void;
  checked: boolean;
}) => {
  return (
    <label className="switch">
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
