import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "../axios";
import Notification from "../Common/Notification";
import { isEmpty } from "lodash";
import InvoiceTemplate from "../Common/InvoiceTemplate";

function Cart({ cartItems, resetCartItems }) {
  const [error, setError] = useState(false);
  const [statusMsg, setStatusMsg] = useState([]);
  const [invoiceImage, setInvoiceImage] = useState(null);
  const [isWhatsappConsent, setIsWhatsappConsent] = useState(true);

  async function sendBillToWhatsapp(imageBase64, customerNumber, customerName) {
    const body = {
      image: imageBase64,
      caption: `Your purchase made our day….. We hope that it makes your day too! Thank you, ${customerName} for your order.`,
    };

    try {
      console.log("in try");
      setError(false);
      // 8850896641
      // setIsSubmitting(true);
      const res = await axios.post(`/chat/sendimage/91${customerNumber}`, body);
      // setIsSubmitting(false);
      // console.log(res);
      // console.log(res.data);
      // console.log(res.data.data);
      setStatusMsg((prevMsg) => [...prevMsg, res.data]);
      setError(res.data.status === "error");
      // res.data.status === "error" ? setError(true) : setError(false);
    } catch (error) {
      // console.log(error);
      // console.log(error.response);

      setError(true);
      setStatusMsg((prevMsg) => [...prevMsg, error.message]);
    }
    // console.log('after fetch try catc ')
  }

  const [isValidNum, setIsValidNum] = useState(false);

  async function isValidWhatsappNumber(customerNumber) {
    console.log("customerNumber", customerNumber);
    await axios
      .get(`/contact/isregistereduser/91${customerNumber}`)
      .then((res) => {
        console.log(res.data);
        if (res.status === "success") {
          setError(false);
          setIsValidNum(true);
        } else {
          setError(true);
          setIsValidNum(false);
          // return false
          console.log("not valid");
        }
        setStatusMsg((prevMsg) => [...prevMsg, res.data]);

        return res;
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(true);
        setStatusMsg((prevMsg) => [
          ...prevMsg,
          error.response.data.data,
          error,
        ]);
      });
  }

  const placeOrder = async (orderData) => {
    if (isWhatsappConsent) isValidWhatsappNumber(orderData.userInfo.userNum);

    if (isValidNum || !isWhatsappConsent) {
      console.log(orderData)
      await axios
        .post("/orderHistory/addOrderHistory", orderData)
        .then((res) => {
          if ((res.status === 200) & isWhatsappConsent) {
            console.log("has consent");
            sendBillToWhatsapp(
              invoiceImage,
              orderData.userInfo.userNum,
              orderData.userInfo.userName
            );
          }
          setError(false);
          console.log(res.data.data);
          setStatusMsg((prevMsg) => [...prevMsg, res.data.data]);
          resetCartItems();
          setIsWhatsappConsent(true);
          return res;
        })
        .catch((error) => {
          console.log(error.response);
          setError(true);
          setStatusMsg((prevMsg) => [...prevMsg, error.response.data.data]);
          // console.log(error);
          // console.log(error.response.data);
        });
    }
  };

  const invoiceDetails = (orderData) => {
    placeOrder(orderData);
    console.log(orderData);
    console.log(invoiceImage);
  }

  // const onConsentChange = (e) => {
  //   setIsWhatsappConsent(e.target.checked);
  //   if (!e.target.checked) clearErrors(["customerName", "customerNumber"]);
  // }

  return (
    <Container>
      {/* <p>{isWhatsappConsent? 'yes': 'no'}</p> */}
      {
        // isSubmitting ||
        statusMsg.map((msg, index) => (
          <Notification
            key={index}
            on={isEmpty(statusMsg)}
            msg={msg}
            status={error ? "danger" : "success"}
          />
        ))
      }
      <InvoiceTemplate
        withForm={true}
        cartItems={cartItems}
        setUserInvoice={invoiceDetails}
        invoiceImg={(img) => setInvoiceImage(img)}
        isConsent={(isConsent) => setIsWhatsappConsent(isConsent)}
      />
    </Container>
  );
}

export default Cart;
