import * as htmlToImage from "html-to-image";
import download from "downloadjs";


export const InvoiceImgURL = (targetEle,downloadAllowed) =>{
  // console.log(targetEle)
  
  //  ''
  htmlToImage
    .toPng(targetEle, { width: 600, height: 700 })
    .then(function (dataUrl) {
      const base64Img = dataUrl;
      // console.log("base64Img:", base64Img);
      return base64Img;

      // return downloadAllowed ? download(dataUrl, "my-node.png") : dataUrl;
      // download(dataUrl, "my-node.png");
    });
    // console.log("base64Img1:", base64Img);
    // return base64Img;
};

export const DownloadInvoice = (targetEle) => {
  let base64Img = "";
  htmlToImage
    .toPng(document.getElementById(targetEle), { width: 600, height: 700 })
    .then(function (dataUrl) {
      base64Img = dataUrl;
      // download(dataUrl, "my-node.png");
    });
  return base64Img;
};