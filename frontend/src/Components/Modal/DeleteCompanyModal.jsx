import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Companies from "../../Data/companies.json";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

function DeleteCompanyModal(props) {
  const { stock, userInfo, setUserInfo, ...restProps } = props;

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      company: stock.name,
    };
    // console.log(data);

    try {
      const response = await axios.post("/api/user/deleteCompanyStock", data);
      console.log(response.data.data);
      toast.success("Company Deleted Successfully");
      setUserInfo(response.data.data);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }

    handleCloseModal();
  };

  return (
    <>
      <Button variant="danger mx-2" onClick={handleShowModal}>
        <MdDelete />
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title> Confirm Stock Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            Confirm {stock.name} Stocks Deletion?
            <Button variant="primary" type="submit" className="w-100 my-3">
              Delete Stocks
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

export default DeleteCompanyModal;
