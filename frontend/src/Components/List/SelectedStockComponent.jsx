import React from "react";
import { Container, Table } from "react-bootstrap";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import UpdateStockModal from "../Modal/UpdateStockModal";

const SelectedStocksComponent = ({ userInfo, setUserInfo }) => {
  return (
    <Container>
      <Table responsive="sm" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Number of Stocks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userInfo?.companies?.map((stock, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td className="d-flex">
                  <UpdateStockModal stock={stock} setUserInfo={setUserInfo} />
                  <br></br>
                  <button className="btn btn-danger me-2">
                    <MdDelete stock={stock} setUserInfo={setUserInfo} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default SelectedStocksComponent;
