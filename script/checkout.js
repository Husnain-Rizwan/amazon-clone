import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";


async function loadPage(){
  await loadProductsFetch();

  renderCheckoutHeader();
	renderOrderSummary();
	renderPaymentSummary();
}
loadPage();

/*
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
*/


