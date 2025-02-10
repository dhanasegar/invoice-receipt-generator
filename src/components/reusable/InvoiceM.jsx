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

  return (
    <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
      <div id="invoiceCapture" style={{ padding: "50px" }}>
        {/* Logo Section */}
        <div
          className="d-flex flex-row justify-content-center"
          style={{
            backgroundColor: "rgb(223, 223, 223)",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <img
            src={img1}
            alt="Company Logo"
            style={{ width: "200px", height: "auto" }}
          />
        </div>

        {/* Billed To, Billed From, and Date Section */}
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
            <div className="fw-bold">Date of Issue:</div>
            <div>{new Date().toLocaleDateString()}</div>
          </Col>
        </Row>

        {/* Invoice Title (Centered) */}
        <div
          className="d-flex flex-row justify-content-center"
          style={{
            backgroundColor: "rgb(223, 223, 223)",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h2 className="text-center">INVOICE</h2>
        </div>

        {/* Table Section */}
        <Table responsive className="mb-4">
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
                <td className="text-end" style={{ width: "100px" }}>
                  {props.info.currency} {item.fees}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Total Section */}
        <div className="d-flex justify-content-end mt-4">
          <h4 className="fw-bold">
            Total: {props.info.currency} {props.d}
          </h4>
        </div>

        {/* Notes Section */}
        {props.info.notes && (
          <div
            className="bg-light py-3 px-4 rounded"
            style={{ marginTop: "20px" }}
          >
            {props.info.notes}
          </div>
        )}
      </div>

      {/* Download Button */}
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