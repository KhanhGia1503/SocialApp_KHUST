const nodemailer = require("nodemailer");

module.exports = async (maiilDetail) => {
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
