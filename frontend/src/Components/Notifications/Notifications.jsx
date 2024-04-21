import React from "react";
import { Container, Table } from "react-bootstrap";
import UpdateStockModal from "../Modal/UpdateStockModal";
import DeleteCompanyModal from "../Modal/DeleteCompanyModal";

const Notifications = (props) => {
  const { userInfo, setUserInfo } = props;
  return (
    <Container>
      <Table responsive="sm" striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Priority Grade</th>
            <th>News Article</th>
          </tr>
        </thead>
        <tbody>
          {userInfo?.notifications?.map((news, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{news.name}</td>
                <td>{news.priorityLevel}</td>
                <td className="d-flex">
                  <a href={news.url} target="_blank">
                    Link
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Notifications;
