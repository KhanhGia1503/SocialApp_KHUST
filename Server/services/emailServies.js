// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
const mailService = async (maiilDetail) => {
  console.log(maiilDetail);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "duongkhanhb1k39@gmail.com",
      pass: "djnxgqlgypidnyyq",
    },
  });
  const info = await transporter.sendMail(maiilDetail);
};
export default mailService;
