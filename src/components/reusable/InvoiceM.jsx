import React from "react";
import { Row, Col, Modal, Table, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import img1 from "/images/logo.png";

export default function InvoiceM(props) {
  // Function to generate the invoice PDF
  const generateInvoice = () => {
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });
      pdf.internal.scalefactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    });
  };
  console.log("props.items", props.items);
  console.log("Items in InvoiceM:", props.items);

  return (
    <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
      <div id="invoiceCapture">
        <div
          className="d-flex flex-row justify-content-center"
          style={{
            backgroundColor: "rgb(223, 223, 223)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <img
            src={img1}
            alt="Company Logo"
            style={{ width: "200px", height: "auto", marginRight: "15px" }}
          />
        </div>
        <hr />

        <div className="p-4">
          <Row className="mb-4">
            <Col md={4}>
              <div className="fw-bold">Billed To:</div>
              <div>{props.info.billTo || ""}</div>
              <div>{props.info.billToAddress || ""}</div>
              <div>{props.info.billToEmail || ""}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold">Billed From:</div>
              <div>{props.info.billFrom || ""}</div>
              <div>{props.info.billFromAddress || ""}</div>
              <div>{props.info.billFromEmail || ""}</div>
            </Col>
            <Col md={4}>
              <div className="fw-bold mt-2">Date of Issue:</div>
              <div>{new Date().toLocaleDateString()}</div>
            </Col>
          </Row>

          <div
            className="d-flex flex-row justify-content-center"
            style={{
              backgroundColor: "rgb(223, 223, 223)",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h2>INVOICE</h2>
          </div>

          <Table className="mb-e">
            <thead
              style={{
                backgroundColor: "rgb(223, 223, 223)",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <tr>
                <th>DURATION</th>
                
                <th>DESCRIPTION</th>
                <th className="text-end">AMOUNT</th>
              </tr>
            </thead>

            <tbody>
              {props.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.duration}</td>
                  <td>
                    "{item.name}" {item.description}
                  </td>
                  {/* <td>
                    {item.name} {item.description}
                  </td>
                  <td>
                    {item.name} {item.description}
                  </td> */}
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.info.currency} {item.fees}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* <Table className="mb-e">
            <thead
              style={{
                backgroundColor: "rgb(223, 223, 223)",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <tr>
                <th>DURATION</th>
                <th>DESCRIPTION</th>
                <th className="text-end">AMOUNT</th>
              </tr>
            </thead>

            <tbody>
              {props.items.map((item, i) => (
                <tr id={i} key={i}>
                  <td style={{ width: "70px" }}>{item.duration}</td>
                  <td>{item.name} {item.description}</td>
                  <td className="text-end" style={{ width: "100px" }}>
                  {props.info.currency} {props.total}
                  </td>
                </tr>
              ))}
              <tr>
                <td>{props.items.duration}</td>
                <td>
                  {props.items.name} {props.items.description}
                </td>
                <td className="text-end" style={{ width: "100px" }}>
                  {props.info.currency} {props.total}
                </td>
              </tr>
            </tbody>
          </Table> */}

          <Table>
            <tbody>
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  <h4>
                    Total: {props.currency} {props.d}
                  </h4>
                </td>
                {/* <td className="text-end" style={{ width: "100px" }}>
                  {props.currency} {props.d} 
                </td> */}
              </tr>
            </tbody>
          </Table>

          {props.info.notes && (
            <div className="bg-light py-3 px-4 rounded">{props.info.notes}</div>
          )}
        </div>
      </div>

      <div className="pd-4 px-4">
        <Button
          variant="primary"
          className="d-block w-100 mt-3 mt-md-1 mb-3"
          onClick={generateInvoice}
        >
          Download
        </Button>
      </div>
    </Modal>
  );
}
