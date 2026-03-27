const SSLCommerz = require("sslcommerz-lts");
const user_info = require("../../model/user.models");
const transactionRes = require("../../model/transaction.models");
const generateTransactionID = require("../../config/TransactionID");
const store_id = process.env.SSLCZ_STORE_ID;
const store_passwd = process.env.SSLCZ_STORE_PASS;
const is_live = false;
const domain = "https://banking-app-backend-0ls2.onrender.com"
const userid = "";
const addMney = (req, res) => {
  const { amount, cus_name, cus_email } = req.body;
  const userid = req.token.id;
  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: "REF" + Date.now(),
    success_url: `${domain}/payment/payment/success/${userid}`,
    fail_url: `${domain}/payment/fail`,
    cancel_url: `${domain}/payment/cancel`,

    shipping_method: "NO",
    product_name: "Test Payment",
    product_category: "General",
    product_profile: "general",

    cus_name,
    cus_email,
    cus_add1: "Dhaka",
    cus_phone: "01700000000",
  };

  const sslcz = new SSLCommerz(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.json({ url: GatewayPageURL });
  });
};

const success = async (req, res) => {
  const userid = req.params.userid;
  // console.log(req.body);
  console.log(userid);
  const data = req.body;
  const sslz = new SSLCommerz(store_id, store_passwd, is_live);
  sslz.validate(data).then(async (data) => {
    if (data.status === "VALID") {
      try {
        const res = await user_info.findOne({ _id: userid });
        res.ammount = Number(res.ammount) + Number(data.amount);
        await res.save();

        const transation = await transactionRes.create({
        
          senderId: userid,
          amount: data.amount,
          category: data.card_issuer,
          TransactionID: generateTransactionID(),
          date: new Date(),
        });
        res.Transactions.push(transation._id);
        await res.save();

      } catch (error) {
        console.log("error", error);
      }
    }
  });
  res.redirect(`${domain}/dasbord`);
};

module.exports = { addMney, success };
