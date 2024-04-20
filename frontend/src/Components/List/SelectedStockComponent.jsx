import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';

const SelectedStocksComponent = ({ selectedStocks }) => {
  return (
    <Container>
      <ListGroup>
        {selectedStocks.map((stock, index) => (
          <ListGroup.Item key={index}>
            <strong>Company:</strong> {stock.company}, <strong>Stock Unit:</strong> {stock.stockUnit}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default SelectedStocksComponent;
