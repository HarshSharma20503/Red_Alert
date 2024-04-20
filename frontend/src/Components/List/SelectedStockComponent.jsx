import React from "react";
import { Container, ListGroup } from "react-bootstrap";

const SelectedStocksComponent = ({ selectedStocks }) => {
  return (
    <Container>
      <ListGroup>
        {selectedStocks.map((stock, index) => (
          <ListGroup.Item key={index}>
            <strong>Company:</strong> {stock.name}, <strong>Stock Unit:</strong> {stock.quantity}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default SelectedStocksComponent;
