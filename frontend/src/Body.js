import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddItem from "./Menu/AddItem/AddItem";
import Invoice from "./Invoice/InvoiceTemplate";
import ItemList from "./Menu/ListItem/ListItem";
import PlaceOrder from "./Order/PlaceOrder/PlaceOrder";
import OrderHistory from "./Order/OrderHistory";
import { Container, Row, Col } from "react-bootstrap";

function Body() {
  return (
    <Container className="my-5">
      <Row>
        <Col xs="12">
          <Routes>
            <Route exact path="/additem" element={<AddItem />} />
            <Route exact path="/itemlist" element={<ItemList />} />
            <Route exact path="/placeorder" element={<PlaceOrder />} />
            <Route exact path="/placeorder" element={<PlaceOrder />} />
            <Route exact path="/orderhistory" element={<OrderHistory />} />
            <Route exact path="/" element={<ItemList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default Body;
