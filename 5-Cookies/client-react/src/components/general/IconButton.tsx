import React from "react";

const IconButton = ({
  cb,
  icon,
  className,
}: {
  cb: () => void;
  icon: string;
  className: string;
}) => {
  return (
    <button className={className} style={{ cursor: "pointer" }} onClick={cb}>
      <i className={icon} />
    </button>
  );
};

export default IconButton;
