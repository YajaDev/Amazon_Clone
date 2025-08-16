import { calculateCartQuantity } from "../data/cart.js";
import { getMatchingItem, loadProductsFetch } from "../data/products.js";
import { getOrder } from "../data/orders.js";
import dayjs from "https://esm.run/dayjs";
loadPage();

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
  
  const orderHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">Arriving on ${dayjs(orderedProduct.estimatedDeliveryTime).format('dddd, MMMM D')}</div>

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
      <div class="progress-label current-status">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>`;
    
  document.querySelector('.order-tracking').innerHTML = orderHtml
}