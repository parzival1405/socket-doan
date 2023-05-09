require("dotenv").config();
const sendEmailAPI = require("./sendEmailAPI");
module.exports.send = async (req, res) => {
  const { linkQR, email } = req.body;
  await sendEmailAPI.sendMail({
    from: "Bui Quang Huu <bqhuu130375@gmail.com>",
    to: [email],
    subject: "Mã QR phiếu đặt lịch",
    text: "Mã QR phiếu đặt lịch",
    html: `
          <img src="cid:QrCode" alt="img" />
    `,
    attachments: [
      {
        raw: `Content-Type: image/png; name="QR.png"
        Content-Disposition: inline; filename="QR.png"
        Content-Transfer-Encoding: base64
        Content-ID: QrCode
        Content-Location: QR.png`,
      },
    ],
  });

  res.status(200).json({ message: "send email success" });
};
