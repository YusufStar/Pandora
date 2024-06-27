//* Import dependencie
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser")
const Iyzipay = require("iyzipay")
const cors = require("cors")

//* Intialize env veriables
const { config } = require("dotenv");
config();

//* Setup the express server
const app = express();

app.use(cors({
  allowedHeaders: ["*"],
  origin: "*",
  methods: ["POST", "GET", "PUT"]
}))
app.use(bodyParser.json())

const server = http.createServer(app);
const port = process.env.PORT || 3000;

//* Import middlewares into express
app.use(express.json({ limit: "1mb" }));

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.IYZICO_BASE_URL
})

app.post("/api/payment", (req, res) => {
  const {price, paidPrice, currency, basketId, paymentCard, buyer, shippingAddress, billingAddress, basketItems} = req.body

  const request = {
    locale: "TR",
    conversationId: '123456789',
    price: price,
    paidPrice: paidPrice,
    currency: currency,
    installment: '1',
    basketId: basketId,
    paymentChannel: "WEB",
    paymentGroup: "PRODUCT",
    paymentCard: paymentCard,
    buyer: buyer,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    basketItems: basketItems
};

iyzipay.payment.create(request, (err, result) => {
  if (err) {
    return res.status(500).json(err)
  }
  res.status(200).json(result)
})
})

//* Start the server
server.listen(port, () => {
  console.log(`Server started, PORT -> ${port}`)
});
