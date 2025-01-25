import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Editablefield from "./Editablefield";
import { BiTrash } from "react-icons/bi";

export default function Invoiceitem(props) {
  const [items, setItems] = useState(props.items);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Calculate total whenever items change
    const total = items.reduce((acc, item) => acc + (item.fees || 0), 0);
    setTotalAmount(total);
    
    props.setd(total);
    console.log(props)

    // const durations = items.map((item) => item.duration);
    // const descriptions = items.map((item) => item.description);

    // props.setdu(durations);
    // props.setdes(descriptions);
  }, [items]);

  const handleItemEdit = (id, name, value) => {
    console.log("data")
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, [name]: name === "fees" ? parseFloat(value) : value }
        : item
    );
    console.log("sds",updatedItems)
    setItems(updatedItems);
    props.setItems(updatedItems)
  };

  const itemTable = items.map((item) => (
    <ItemRow
      onItemizedItemEdit={handleItemEdit}
      item={item}
      onDelEvent={props.onRowDel}
      key={item.id}
      currency={props.currency}
    />
  ));
  console.log("props.item.fees", props);
  // console.log("props.item.duration", items);
  // console.log("props.item.description", items);

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Duration</th>
            <th>Fees</th>
            {/* <th className="text-center">Action</th> */}
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <h4>
        Total: {props.currency} {totalAmount.toFixed(2)}
      </h4>
    </div>
  );
}

function ItemRow(props) {
  const onDelEvent = () => {
    props.onDelEvent(props.item.id);
  };

  const r=()=>{
    console.log("a",props)
    // if (props.onItemizedItemEdit) {
    //   props.onItemizedItemEdit();  // Check if this function exists
    // } else {
    //   console.log("onItemizedItemEdit is not defined");
    // }
    console.log("susfubs")
  }



  return (
    <tr>
      <td style={{ width: "100%" }}>
        <Editablefield
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Course Name",
            id: props.item.id,
            value: props.item.name,
          }}
        />
        <Editablefield
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Course Description",
            id: props.item.id,
            value: props.item.description,
          }}
        />
      </td>
      <td style={{ minWidth: "170px" }}>
        <Editablefield
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "select",
            name: "duration",
            value: props.item.duration ?? "1_month",
            id: props.item.id,
            options: [
              { value: "3_months", label: "3 Months" },
              { value: "1_month", label: "1 Month" },
              { value: "14_days", label: "14 Days" },
            ],
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <Editablefield
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            leading: props.currency,
            type: "number",
            name: "fees",
            value: props.item.fees ?? "0",
            id: props.item.id,
            placeholder: "Fees",
            min: "0",
            step: "any",
          }}
        />
      </td>
      
    </tr>
  );
}



