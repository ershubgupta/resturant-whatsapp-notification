import React, { useRef, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
// import download from 'downloadjs'

import * as htmlToImage from "html-to-image";
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

import {InvoiceImgURL} from './ShareInvoice'
import { Typography } from "@mui/material";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}
const invoiceDetails = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

// const dishList = [
//   createRow('Paperclips (Box)', 100, 1.15),
//   createRow('Paper (Case)', 10, 45.99),
//   createRow('Waste Basket', 2, 17.99),
// ];

// const invoiceSubtotal = subtotal(dishList);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function InvoiceTemplate({dishList}) {
  console.log("dishList", dishList);
  const template = useRef(null);
  const test = InvoiceImgURL(template.current); 
  // console.log(template.current); 
  console.log("test: ", test);
  // InvoiceImgURL(template.current);
  const [img, setImg] = useState("");
  // console.log(document.getElementById("my-node"));
  htmlToImage
    .toPng(document.getElementById("my-node"), { width: 600, height: 700 })
    .then(function (dataUrl) {
      // console.log(<img alt="" src={`data:image/jpeg;base64,${dataUrl}`} />);
      setImg(dataUrl);
      // download(dataUrl, "my-node.png");
    });
  return (
    <Container component="main" maxWidth="sm">
      {/* <img src={img} alt="" /> */}
      <Typography component="h1" variant="h5">
        Resturant Name
      </Typography>
      <Typography component="h1" variant="h6" marginBottom={2}>
        Address
      </Typography>
      {/* Date, time, order no, invoice no, tel, emailid, footer note*/}
      {/* thanks for dinning with us, please visit again */}
      <TableContainer component={Paper} id="my-node" ref={template}>
        <Table aria-label="spanning table">
          <TableBody>
            <TableRow>
              <TableCell>Date:</TableCell>
              <TableCell align="right">11/11/2011</TableCell>
              <TableCell align="right">Invoice:</TableCell>
              <TableCell align="right">22</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <Typography component="h3" variant="h6">
                  Order No. 18
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Qty.</TableCell>
              <TableCell align="right">Rate</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dishList && dishList.map((row,i) => (
              <TableRow key={row.i}>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                {/* <TableCell align="right">{row.unit}</TableCell> */}
                {/* <TableCell align="right">{ccyFormat(row.price)}</TableCell> */}
              </TableRow>
            ))}

            {/* <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                0
              )} %`}</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow> */}
            <TableRow>
              <TableCell>
                <Typography component="h3" variant="h6">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="right" colSpan={3}>
                <Typography component="h3" variant="h6">
                  {/* {ccyFormat(invoiceTotal)} */}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
