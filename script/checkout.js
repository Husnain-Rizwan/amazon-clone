import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from '../data/Cart.js';
// import '../data/Cart-class.js';

Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    })
  })
]).then(() => {
  renderCheckoutHeader();
	renderOrderSummary();
	renderPaymentSummary();
});


