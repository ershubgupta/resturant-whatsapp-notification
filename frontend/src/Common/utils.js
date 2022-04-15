export const setDate = () => {
  const d = new Date();
  const date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
  return date;
};

export const setTime = () => {
  const d = new Date();
  const time =
    d.getHours() +
    ":" +
    d.getMinutes() +
    " " +
    (d.getHours() <= 12 ? "AM" : "PM");
  return time;
};

export const sumTotalAmount = (itemArr) => {
  const amountArr = itemArr.map((i) => i.quantity * i.unitPrice);
  const payableAmount = amountArr.reduce((item, total) => item + total, 0);
  // setTotalAmountToPay(payableAmount);
  return payableAmount;
};