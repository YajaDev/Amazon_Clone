import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import "../backend/backend-practice.js";

Promise.all([
  new Promise((resolve) => {
    console.log("start promise");
    loadProducts(() => {
      console.log("load product");
      resolve();
    });
  }),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
})

/*
new Promise((resolve) => {
  console.log("start promise");
  loadProducts(() => {
    console.log("load product");
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
    console.log("finish");
  });
*/

/*
loadProducts(() => {
  console.log('loadTo');
  renderOrderSummary();
  renderPaymentSummary();
});
*/