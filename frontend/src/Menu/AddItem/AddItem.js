import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import isEmpty from "lodash/isEmpty";

import Container from "react-bootstrap/Container";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card, Col, Row } from "react-bootstrap";
import Notification from "../../Common/Notification";
import { InputtField, SelectField } from "../../Common/InputtField";

function AddItem() {
  const addToMenu = useRef(null);
  const [statusMsg, setStatusMsg] = useState({});
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  async function addItem(data) {
    const body = {
      name: data.dishName,
      description: data.dishDescription,
      category: data.dishCategory,
      priceFull: data["price-full"],
      priceHalf: data["price-half"],
    };

    try {
      setError(false);
      const res = await axios.post("/menuItem/addMenu", body);
      setStatusMsg(res.data.data);
    } catch (error) {
      setError(true);
      setStatusMsg(error.response.data.data);
    }
  }
  const onSubmit = (data) => {
    addItem(data);
    reset();
  };

  return (
    <Container>
      <Notification
        on={isEmpty(statusMsg)}
        msg={statusMsg}
        status={error ? "danger" : "success"}
      />
      <Row>
        <Col md="6" className="mx-auto">
          <Card>
            <Card.Body>
              <h4 className="mb-4 text-center">Add Item in the Menu</h4>
              <Form
                ref={addToMenu}
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="mb-3">
                  <InputtField
                    fieldname="Dish Name"
                    name="dishName"
                    label="Name of the Dish"
                    type="text"
                    required={true}
                    errMsg="This field is required"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="mb-3">
                  <InputtField
                    fieldname="Dish Description"
                    name="dishDescription"
                    label="Description of the Dish"
                    type="text"
                    required={true}
                    errMsg="This field is required"
                    register={register}
                    errors={errors}
                  />
                </div>
                <div className="mb-3">
                  <SelectField
                    fieldname="Category"
                    name="dishCategory"
                    label="Please select the category"
                    required={true}
                    errMsg="This field is required"
                    options={[
                      { value: "", label: "Select" },
                      { value: "starter", label: "starter" },
                      { value: "main course", label: "main course" },
                      { value: "sider", label: "sider" },
                    ]}
                    register={register}
                    errors={errors}
                  />
                </div>
                <Row className="mb-3">
                  <Col xs="6">
                    <InputtField
                      fieldname="Price"
                      name="price-full"
                      label="Full"
                      type="number"
                      required={true}
                      errMsg="This field is required"
                      register={register}
                      errors={errors}
                    />
                  </Col>
                  <Col xs="6">
                    <InputtField
                      name="price-half"
                      label="Half"
                      type="number"
                      required={false}
                      errMsg="This field is required"
                      register={register}
                      errors={errors}
                    />
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                  className="mt-3 mx-auto d-flex"
                  disabled={!isEmpty(errors)}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddItem;
