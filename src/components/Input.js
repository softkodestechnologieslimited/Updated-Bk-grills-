import React, { useState } from "react";

const Input = (props) => {
  const [inputType] = useState(props.type);
  const [inputName] = useState(props.name);
  const [className] = useState(props.className);
  const [inputValue, setInputValue] = useState("");
  const [inputPlaceholder] = useState(props.placeholder);


  const handleChange = (e) => {
    setInputValue(e.target.value);

    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <input
      type={inputType}
      className={className}
      value={inputValue}
      name={inputName}
      placeholder={inputPlaceholder}
      onChange={handleChange}
      required
    />
  );
};

export default Input;
