import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Select from "react-select";
import Companies from "../../Data/companies.json"

function AddCompanyModal() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("selected");
  const [stockUnits, setStockUnits] = useState(0);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSelectChange = (selectedOption) => {
    setSelectedCompany(selectedOption.value);
  };

  const handleStockUnitsChange = (e) => setStockUnits(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      company: selectedCompany,
      stockUnits: stockUnits,
    };
    console.log(data);
    handleCloseModal();
  };

  const companies = Companies;
  const options = companies.map((company, index) => ({
    value: company, //
    label: company, //search
  }));

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Add Company Stocks
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title> Add Company Stocks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="companySelect">
              <Form.Label className="my-3">Select Company</Form.Label>
              <Select
                value={{ value: selectedCompany, label: selectedCompany }}
                onChange={handleSelectChange}
                options={options}
                placeholder="Select..."
                isClearable
              />
            </Form.Group>
            <Form.Group controlId="stockUnitsInput">
              <Form.Label className="my-3">Stock Units</Form.Label>
              <Form.Control type="number" value={stockUnits} onChange={handleStockUnitsChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 my-3">
              Add Stocks
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCompanyModal;
