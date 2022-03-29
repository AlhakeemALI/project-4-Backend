const asyncHandler = require("express-async-handler");
const querystring = require("querystring");

const stripe = require("stripe")(process.env.STRIPE_SECRET);
//console.log(stripe);
//const stripe = Stripe(process.env.STRIPE_SECRET);
//const stripe = Stripe(process.env.STRIPE_SECTET);
const User = require("../models/userModel");

const createStripeId = asyncHandler(async (req, res) => {
  //const id = req.user.id;
  const user = await User.findById(req.user._id).exec();

  console.log("REQ USER ID===>", user);
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({ type: "express" });
    user.stripe_account_id = account.id;
    user.save();
    console.log(account);
  }

  const accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_ULR,
    return_url: process.env.STRIPE_ULR,
    type: "account_onboarding",
  });
  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  console.log("ACCOUNT LINK", accountLink);
});

module.exports = {
  createStripeId,
};
