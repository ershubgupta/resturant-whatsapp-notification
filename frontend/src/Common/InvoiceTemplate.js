import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import download from "downloadjs";

import {
  Card,
  Col,
  Container,
  Row,
  Table,
  Button,
  Form,
} from "react-bootstrap";
import * as htmlToImage from "html-to-image";
import { isEmpty } from "lodash";
import { InputtField } from "../Common/InputtField";
import { setDate, setTime, sumTotalAmount } from "./utils";

function InvoiceTemplate({
  withForm,
  cartItems,
  setUserInvoice,
  invoiceImg,
  isConsent,
}) {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onBlur",
  });

  const template = useRef(null);

  const [totalAmountToPay, setTotalAmountToPay] = useState(null);
  const [isWhatsappConsent, setIsWhatsappConsent] = useState(true);

  useEffect(() => {
    setTotalAmountToPay(sumTotalAmount(cartItems));
    if (isEmpty(cartItems)) setIsWhatsappConsent(true);
  }, [cartItems]);

  const orderDetails = cartItems.map((dish, i) => ({
    name: dish.name,
    quantity: dish.quantity,
    unitPrice: dish.unitPrice,
    totalPrice: dish.quantity * dish.unitPrice,
  }));

  const saveOrderDetails = async (data) => {
    console.log("fordata", data);
    const randomNum = Math.floor(Math.random() * 100);
    const orderDetailsWithUserInfo = {
      invoiceNo: randomNum,
      orderDate: setDate(),
      orderTime: setTime(),
      orderNo: randomNum,
      userInfo: {
        userName: data.customerName,
        userNum: data.customerNumber,
      },
      orderDetails: orderDetails,
      // invoiceImg: imageBase64,
    };
    console.log(orderDetailsWithUserInfo);
    setUserInvoice(orderDetailsWithUserInfo);
  };

  const generateInvoice = (data) => {
    htmlToImage
      .toPng(template.current, { width: 600, height: 700 })
      .then(function (dataUrl) {
        const imageBase64 = dataUrl.replace("data:", "").replace(/^.+,/, "");
        // var img = new Image();
        // img.src = dataUrl;
        // document.body.appendChild(template.current);
        // console.log(imageBase64);
        // console.log(dataUrl);

        // console.log(<img alt="" src={`data:image/jpeg;base64,${dataUrl}`} />);
        // setInvoiceImage(imageBase64);
        saveOrderDetails(imageBase64, data);
        invoiceImg(imageBase64);
        // var link = document.createElement("a");
        // link.download = "my-image-name.jpeg";
        // link.href = dataUrl;
        // console.log(link);
        // link.click();
        // download(dataUrl, "my-node.png");
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  const onConsentChange = (e) => {
    setIsWhatsappConsent(e.target.checked);
    if (!e.target.checked) clearErrors(["customerName", "customerNumber"]);
  };

  useEffect(() => {
    isConsent(isWhatsappConsent);
  }, [isWhatsappConsent]);

  return (
    <Container>
      {/* <p>{isWhatsappConsent ? "pyes" : "pno"}</p> */}

      <Row>
        <Col xs="12" className="text-center">
          {!isEmpty(cartItems) ? (
            <Form
              onSubmit={handleSubmit(generateInvoice)}
              encType="multipart/form-data"
            >
              <Card style={{ width: "35rem" }} ref={template}>
                <Card.Body className="pb-0">
                  <Card.Title>Resturant Name</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Address
                  </Card.Subtitle>
                  <Card.Text>
                    Thank you so much for your Order.
                    <br />
                    We are honored to have clients like you.
                  </Card.Text>
                  <Row className="text-start">
                    <Col xs="6">
                      <InputtField
                        fieldname="Custmore Name"
                        name="customerName"
                        type="text"
                        required={isWhatsappConsent}
                        placeholder="Enter Customer Name"
                        register={register}
                        errors={errors}
                        className="bg-transparent border-0 ps-0"
                      />
                    </Col>
                    <Col xs="6">
                      <InputtField
                        fieldname="Custmore Number"
                        name="customerNumber"
                        type="text"
                        required={isWhatsappConsent}
                        placeholder="Enter Customer Number"
                        register={register}
                        errors={errors}
                        maxLength={10}
                        minLength={10}
                        className="bg-transparent border-0 ps-0 text-end"
                      />
                    </Col>
                    <Col xs="4">Invoice: 22</Col>
                    <Col xs="4">Date: {setDate()}</Col>
                    <Col xs="4">Time: {setTime()}</Col>

                    <Col xs="12" className="my-3 text-center">
                      <h5>Order No.: 22</h5>
                    </Col>
                  </Row>
                  <Table className="border-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <td>Dish</td>
                        <td>Quantity</td>
                        <td>Rate</td>
                        <td>Amount</td>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((dish, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{dish.name}</td>
                          <td>{dish.quantity}</td>
                          <td>{dish.unitPrice}</td>
                          <td>{dish.quantity * dish.unitPrice}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="4" align="left">
                          Total
                        </td>
                        <td>{totalAmountToPay}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
                <Card.Footer className="text-start">
                  <Form.Check
                    type="checkbox"
                    id="whatsappConsent"
                    name="whatsappConsent"
                    defaultChecked
                    onClick={onConsentChange}
                    {...register("whatsappConsent")}
                    label="Whatsapp me the Reciept"
                  />
                </Card.Footer>
              </Card>
              <Button
                type="submit"
                className="mt-3"
                variant="success"
                disabled={isWhatsappConsent && (!isDirty || !isValid)}
              >
                Place Order
              </Button>
            </Form>
          ) : (
            <Card body>Your cart is empty, add to see the cart</Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default InvoiceTemplate;
