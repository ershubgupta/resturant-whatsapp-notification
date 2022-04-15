import React, { useState, useEffect } from "react";
import { Toast } from 'react-bootstrap';
import { CSSTransition } from "react-transition-group";


const style = {
  zIndex:1000,
  color: 'white',
  fontWeight: 'bold'
}

function Notification({ on, msg, status }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({});
  useEffect(() => {
    setShow(!on);
    setMessage(msg);
    console.log("on", !on);
    console.log(msg);
  }, [on, msg]);

  return (
    <>
      {show && (
        <Toast
          bg={status}
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          // autohide
          className="position-fixed end-0 bottom-0 mb-3 me-3"
          style={style}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{message.title ?? message.status}</strong>
            {/* <small>{message.title}</small> */}
          </Toast.Header>
          <Toast.Body>{message.message}</Toast.Body>
        </Toast>
      )}
    </>
  );
}

export default Notification
