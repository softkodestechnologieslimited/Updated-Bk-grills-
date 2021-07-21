import React, { useState } from "react";

const Button = (props) => {
  const [buttonType] = useState(props.type);
  const [buttonClass] = useState(props.className);

  return (
    <button className={buttonClass} type={buttonType}>
      {props.children}
    </button>
  );
};

export default Button;
