import renderOrderSummary from "./checkout/orderSummary.js";
import renderPaymentSummary from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
//import '../data/cart-class.js';
//import "../backend/backend-practice.js";

async function loadPage() {
  await Promise.all([
    loadProductsFetch(),
    loadCartFetch()
  ])
  .then(()=> {
    renderOrderSummary();
    renderPaymentSummary();
  }).catch(error => {
    alert(error);
  });
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

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
