
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Card, Button } from "react-bootstrap";
import Invoiceitem from "./reusable/invoiceitem";
import InvoiceM from "./reusable/InvoiceM";
import img1 from "/images/logo.png";

export default function InvoiceForm() {
  const [state, setState] = useState({
    isOpen: false,
    currency: "₹",
    currentDate: new Date().toISOString().split("T")[0],
    invoiceNumber: 1,
    billTo: "",
    billToAddress: "",
    billToEmail: "",
    billFrom: "Brain Insight",
    billFromEmail: "braininsight@gmail.com",
    billFromAddress: "Vellore, Tamil Nadu",
    notes: "",
    subTotal: "0.00",
  });


  const [total, setTotal] = useState(0.0);
  const [d, setd] = useState();
  const [e, sete] = useState();
  const [items, setItems] = useState([
    {
      id: "0",
      name: "name",
      description: "Course Description",
      fees: 0.0,
      duration: "1_month", 
    },
  ]);

  // useEffect(()=>{},[e])

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };


  const handleItemEdit = (id, name, value) => {
    // console.log("a;;")
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };



  
  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: "",
      description: "",
      fees: 0.0,
      duration: "1_month", 
    };
    setItems((prevItems) => [...prevItems, newItem]);
  };


  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };


  const calculateTotal = () => {
    const newTotal = items.reduce(
      (acc, item) => acc + (parseFloat(item.fees) || 0),
      0
    );
    setTotal(newTotal.toFixed(2));
    setState((prevState) => ({
      ...prevState,
      subTotal: newTotal.toFixed(2),
    }));
  };


  useEffect(() => {
    calculateTotal();
  }, [items]);
console.log(e)

const handleItesmEdit = () => {
  console.log("Item edited");
};

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setState((prevState) => ({ ...prevState, isOpen: true }));
      }}
    >
      <Row className="justify-content-center">
        <Col md={8} lg={9}>
          <Card className="d-flex p-4 my-3">
            <div
              className="d-flex justify-content-center"
              style={{
                backgroundColor: "rgb(223, 223, 223)",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <img
                src={img1}
                alt="Company Logo"
                style={{
                  width: "250px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
            <hr className="my-4" />

            <Row className="mb-4">
              <Col>
                <Form.Label className="fw-bold">Customer Details:</Form.Label>
                <Form.Control
                  placeholder="Enter Name"
                  value={state.billTo}
                  name="billTo"
                  onChange={handleChange}
                  required
                />
                <Form.Control
                  placeholder="Enter Email"
                  value={state.billToEmail}
                  name="billToEmail"
                  onChange={handleChange}
                  className="my-2"
                />
                <Form.Control
                  placeholder="Enter Address"
                  value={state.billToAddress}
                  name="billToAddress"
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill From:</Form.Label>
                <Form.Control value={state.billFrom} className="my-2" disabled />
                <Form.Control value={state.billFromEmail} className="my-2" disabled />
                <Form.Control value={state.billFromAddress} className="my-2" disabled />
              </Col>
            </Row>

            <Invoiceitem
            setd={setd}
              items={items}
              sete={sete}
              setItems={setItems}
              onItemizedItemEdit={handleItesmEdit}
              // onRowAdd={handleAddItem}
              // onRowDel={handleDeleteItem}
              currency={state.currency}
            />

          </Card>

          <Button
            variant="primary"
            type="submit"
            className="d-block w-100 mt-4 fw-bold"
          >
            Generate Invoice
          </Button>
        </Col>
      </Row>

      <InvoiceM
        showModal={state.isOpen}
        closeModal={() => setState((prevState) => ({ ...prevState, isOpen: false }))}
        info={state}
        items={items}
        
        duration={e}
        d={d}
        e={e}
        total={d}
        currency={state.currency}
      />
    </Form>
  );
}
