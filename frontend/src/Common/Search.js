import React, { useState, useRef, useEffect } from "react";
import useApi from "../Store/useApi";

import Form from "react-bootstrap/Form";
import { Col, Row, Button, ListGroup } from "react-bootstrap";
import Notification from "./Notification";
import { isEmpty } from "lodash";

function Search({ cartItems }) {
  const [searchResult, setSearchResult] = useState([]);
  // const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({});

  const getDishName = useRef("");

  const [list, error, loading] = useApi("/menuItem/getMenu");

  const onSearchItem = (event) => {
    let name = getDishName.current.value.toLowerCase();
    let result = list.filter((e) => e.name.toLowerCase().includes(name));
    setSearchResult(result);
    // console.log(result, searchResult);
  };
  // useEffect(() => {
  //   console.log( searchResult);
  // }, [getDishName.current.value]);

  const addToCart = (e) => {
    e.preventDefault();
    const productId = e.target.dataset.productId;
    const selectedDish = list.find((i) => i._id === productId);
    const selectedDishData = {
      name: selectedDish.name,
      quantity: formData.dishQuantity || "1",
      unitPrice: formData.dishPrice || selectedDish.priceFull,
    };
    // setCart((prevOrder) => [...prevOrder, selectedDishData]);
    // console.log(selectedDishData, cart);
    cartItems(selectedDishData);
    setFormData({});
  };

  const handleFieldChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };
  //   if (loading) {console.log(loading); ; return false;}
  console.log("error", error, loading);
  return (
    <Col>
      {loading ? (
        <p>Loading</p>
        ) : (
          <>
          <Notification on={loading} msg={error} status="danger" />
          <Form.Control
            id="dishName"
            name="dishName"
            autoComplete="false"
            placeholder="Type to search Dish"
            onChange={onSearchItem}
            ref={getDishName}
          />
          {searchResult.length !== 0 && (
            <Row>
              <Col sm="12">
                <Form>
                  <ListGroup
                    as="ol"
                    numbered
                    style={{ maxHeight: "500px" }}
                    className="overflow-auto"
                  >
                    {searchResult.map((item, index) => (
                      <ListGroup.Item
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{item.name}</div>
                          <Form.Check
                            inline
                            label={`Full: ${item.priceFull || "-"}`}
                            name="dishPrice"
                            type="radio"
                            id={`full_${item.name}`}
                            value={item.priceFull}
                            disabled={!item.priceFull}
                            onChange={handleFieldChange}
                          />
                          <Form.Check
                            inline
                            label={`Half: ${item.priceHalf || "-"}`}
                            name="dishPrice"
                            type="radio"
                            value={item.priceHalf}
                            id={`half_${item.name}`}
                            disabled={!item.priceHalf}
                            onChange={handleFieldChange}
                          />
                        </div>
                        <Form.Control
                          style={{ maxWidth: "3rem" }}
                          className="text-center me-2"
                          id="dishQuantity"
                          name="dishQuantity"
                          defaultValue="1"
                          type="text"
                          placeholder="Quantity"
                          onChange={handleFieldChange}
                        />
                        <Button data-product-id={item._id} onClick={addToCart}>
                          Add
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Form>
              </Col>
            </Row>
          )}
        </>
      )}
    </Col>
  );
}

export default Search;
