import React, { useState } from "react";
import Search from '../../Common/Search';
import Cart from "../Cart";

import { Col, Container, Row, Table } from "react-bootstrap";


function PlaceOrder() {
  const [cartItem, setCartItem] = useState([]);

  const getCartItems = (item) => {
    setCartItem((prevItem) => [...prevItem, item]);
  }
  console.log(cartItem)

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <Search cartItems={getCartItems} />
        </Col>
        <Col>
          <Cart cartItems={cartItem} resetCartItems={() => setCartItem([])} />
        </Col>
      </Row>
    </Container>
  );
}

export default PlaceOrder
