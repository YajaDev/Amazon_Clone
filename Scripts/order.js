import { cart, calculateCartQuantity } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { getMatchingItem, loadProductsFetch } from "../data/products.js";
import dayjs from "https://esm.sh/dayjs";
import { centToDollar } from "./utils/money.js";

loadPage();

async function loadPage() {
  // load products
  await loadProductsFetch();

  // Display cartQuantity
  const cartQuantity = calculateCartQuantity();

  if (cartQuantity) {
    document.querySelector(".cart-quantity").innerText = cartQuantity;
  }
  //console.log(orders);

  let ordersSumarry = "";
  
  orders.forEach((order) => {
    // Format order placed to "month day"
    const orderPlaced = dayjs(order.orderTime).format("MMMM D");

    // convert totalCostCents to dollars
    const totalCost = centToDollar(order.totalCostCents);

    // generate html for orders
    ordersSumarry += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderPlaced}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${totalCost}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        ${renderProductSummary(order.products)}
      </div>
    `;
  });

  // Display the generated html
  document.querySelector('.orders-grid').innerHTML = ordersSumarry;

  function renderProductSummary(products) {
    let html = "";

    products.forEach((product) => {
      const productDetails = getMatchingItem(product.productId);
      const {image, name} = productDetails
      const deliveryDate = dayjs(product.estimatedDeliveryTime).format("MMMM D")
      html += 
      `
        <div class="order-details-grid">
          <div class="product-image-container">
            <img src="${image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${deliveryDate}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        </div>
      `;
    });

    return html;
  }
}