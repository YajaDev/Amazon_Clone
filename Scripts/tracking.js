import { calculateCartQuantity } from "../data/cart.js";
import { getMatchingItem, loadProductsFetch } from "../data/products.js";
import { getOrder } from "../data/orders.js";
import { progressPercent } from "./utils/time.js";
import { search } from "./utils/search.js";
import dayjs from "https://esm.run/dayjs";

loadPage();
console.log(dayjs("2025/9/1").format("MMMM, dddd HH:mm:ss a"));

async function loadPage() {
  // load the products in products.js
  await loadProductsFetch();

  const cartQuantity = calculateCartQuantity();
  if (cartQuantity) {
    document.querySelector('.cart-quantity')
    .innerText = cartQuantity;
  }

  const pageUrl = new URL(window.location);
  const orderId = pageUrl.searchParams.get('orderId');
  const productId = pageUrl.searchParams.get('productId');

  const product = getMatchingItem(productId);
  const order = getOrder(orderId);

  const orderedProduct = order.products
    .find(product => product.productId === productId);

  const deliveryTime =dayjs(orderedProduct.estimatedDeliveryTime);

  const orderHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">Arriving on ${deliveryTime.format('dddd, MMMM D')}</div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">Quantity: ${orderedProduct.quantity}</div>

    <img
      class="product-image"
      src="${product.image}"
    />

    <div class="progress-labels-container">
      <div class="progress-label">Preparing</div>
      <div class="progress-label">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar">
        <div class="progress-percent">
        </div>
      </div>
    </div>

    `;

  document.querySelector('.order-tracking').innerHTML = orderHtml;

  // Calculate delivery progress
  const barElement = document.querySelector('.progress-bar');

  const currentTime = dayjs();
  
  const orderedTime = dayjs(order.orderTime);
  let progressPercentBar = Math.round(progressPercent(currentTime,orderedTime,deliveryTime));
  
  let status;

  if (progressPercentBar < 50) {
    status = 'Preparing'

  } else if (progressPercentBar < 100) {
    status = 'Shipped'

  } else {
    status = 'Delivered'
    progressPercentBar = 100
  }

  document.querySelectorAll('.progress-label')
    .forEach(element => {    
      if (element.innerText === status) {
        element.classList.add('current-status')
      }
    });  
  
  document.querySelector('.progress-percent').innerText = `${progressPercentBar}%`;
  barElement.style.width = `${progressPercentBar < 5 ? 5 :progressPercentBar}%`
}
// search button
document.querySelector('.search-button').addEventListener('click', () => {
  search();
});

document.querySelector('.search-bar').addEventListener('keydown', (event) => {  
  if (event.key === "Enter") {
    search();
  }
});