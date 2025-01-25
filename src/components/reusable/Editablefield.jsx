// import React from "react";

// function Editablefield(props) {
//   const { cellData, onItemizedItemEdit } = props;
//   const { type, name, placeholder, value, options, id } = cellData;
//   console.log(name,value)

//   const handleChange = (e) => {
//     let newValue = e.target.value;
  
//     if (type === "Number") {
//       newValue = newValue ? parseFloat(newValue) : 0;  // Handle empty fields and parse
//       if (isNaN(newValue)) {
//         newValue = 0;  // Default to 0 if NaN is encountered
//       }
//     }
  
//     console.log("Editablefield handleChange:", newValue); // Debugging: Log the input value
//     onItemizedItemEdit(id, name, newValue);  // Send updated value to parent
//   };
  
//   if (type === "select") {
//     return (
//       <select
//         name={name}
//         value={value}
//         onChange={handleChange}
//         className="form-control"
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     );
//   }

//   return (
//     <input
//       type={type}
//       name={name}
//       value={value}
//       placeholder={placeholder}
//       onChange={handleChange}
//       className="form-control"
//     />
//   );
// }

// export default Editablefield;


import React from "react";

function Editablefield(props) {
  const { cellData, onItemizedItemEdit } = props;
  const { type, name, placeholder, value, options, id } = cellData;

  const handleChange = (e) => {
    let newValue = e.target.value;
  
    if (type === "Number") {
      newValue = newValue ? parseFloat(newValue) : 0;
      if (isNaN(newValue)) {
        newValue = 0;
      }
    }
    onItemizedItemEdit(id, name, newValue)
  };
  
  if (type === "select") {
    return (
      <select
        name={name}
        value={value || "1_month"}  // Default to "1_month" if value is empty
        onChange={handleChange}
        className="form-control"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value || ""}  // Ensure an empty string is used if value is undefined
      placeholder={placeholder}
      onChange={handleChange}
      className="form-control"
    />
  );
}

export default Editablefield;
