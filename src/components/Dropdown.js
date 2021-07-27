import React, { useState } from "react";


const Dropdown = (props) => {

    const [data] = useState(props.data)
    const [name] = useState(props.name)
    const [className] = useState(props.className)
    const [ selectedData, setSelectedData] = useState('')

    const handleChange = (e) => {
        setSelectedData(e.target.value);
    
        if (props.onChange) {
          props.onChange(e);
        }
      };

      let options = data.map(data => (
        <option key={data.id} value={data.id}>
          {data.name}
        </option>
      ));

      return (
          <select
          name={name}
            className={className}
            onChange={handleChange}
          >
              <option>
                  {options}
              </option>
          </select>
      )
}

export default Dropdown