import React from "react";

function Editablefield(props) {
  const { cellData, onItemizedItemEdit } = props;
  const { type, name, placeholder, value, options, id } = cellData;

  // Handle input changes
  const handleChange = (e) => {
    let newValue = e.target.value;

    // Convert to number if the input type is "number"
    if (type === "number") {
      newValue = newValue ? parseFloat(newValue) : 0;
      if (isNaN(newValue)) {
        newValue = 0; // Fallback to 0 if the input is not a valid number
      }
    }

    // Notify the parent component of the change
    onItemizedItemEdit(id, name, newValue);
  };

  // Render a select dropdown if the type is "select"
  if (type === "select") {
    return (
      <select
        name={name}
        value={value || (options?.[0]?.value || "")} // Default to the first option if value is empty
        onChange={handleChange}
        className="form-control"
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  // Render a regular input for other types
  return (
    <input
      type={type}
      name={name}
      value={value || ""} // Ensure an empty string is used if value is undefined
      placeholder={placeholder}
      onChange={handleChange}
      className="form-control"
    />
  );
}

export default Editablefield;