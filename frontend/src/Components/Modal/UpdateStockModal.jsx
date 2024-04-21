import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineEdit } from "react-icons/md";

function UpdateStockModal(props) {
  const { stock, userInfo, setUserInfo, ...restProps } = props;

  const [showModal, setShowModal] = useState(false);
  const [stockUnits, setStockUnits] = useState(stock.quantity);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleStockUnitsChange = (e) => setStockUnits(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stockUnits == 0) {
      toast.error("Enter Some Stock Units or Delete the stock");
      return;
    }
    const data = {
      company: stock.name,
      stockUnits: stockUnits,
    };
    // console.log(data);

    try {
      const response = await axios.post("/api/user/updateCompanyStock", data);
      // console.log(response.data.data);
      toast.success("Company Added Successfully");

      setUserInfo(response.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }

    handleCloseModal();
  };

  return (
    <>
      <Button variant="primary mx-2" onClick={handleShowModal}>
        <MdOutlineEdit />
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title> Update Company Stocks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="companySelect">
              <Form.Label className="my-3 fw-bold">Company Name</Form.Label>

              <div className="">{stock.name}</div>
            </Form.Group>
            <Form.Group controlId="stockUnitsInput">
              <Form.Label className="my-3 fw-bold">Stock Units</Form.Label>
              <Form.Control type="number" value={stockUnits} onChange={handleStockUnitsChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 my-3">
              Update Stocks
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

export default UpdateStockModal;
