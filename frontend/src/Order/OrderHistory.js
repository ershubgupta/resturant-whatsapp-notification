import React from "react";
import { Table } from "react-bootstrap";
import useApi from "../Store/useApi";

function OrderHistory() {
  const [list, error, loading] = useApi("/orderHistory/getOrderHistory");
  console.log(list);
  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>invoiceNo</th>
              <th>orderDate</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{item.invoiceNo}</td>
                <td>{item.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderHistory;
