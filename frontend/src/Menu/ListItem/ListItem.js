import axios from "../../axios";
import React, { useEffect, useState } from "react";

import { Alert, Table } from "react-bootstrap";

export default function ListItem() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  async function fetchItemList() {
    try {
      const res = await axios.get("/menuItem/getMenu");
      setItems(res.data);
      setError("");
      console.log(res.data);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    fetchItemList();
  }, []);

  return (
    <div>
      <Alert variant="danger" show={!!error}>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
      {!error && items && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price: Full</th>
              <th>Price: Half</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.priceFull || "-"}</td>
                <td>{item.priceHalf || "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
