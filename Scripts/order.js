import { cart, calculateCartQuantity, addToCart } from "../data/cart.js";
import { orders } from "../data/orders.js";
import { getMatchingItem, loadProductsFetch } from "../data/products.js";
import dayjs from "https://esm.sh/dayjs";
import { centToDollar } from "./utils/money.js";
import { search } from "./utils/search.js";

loadPage();

async function loadPage() {
  // load products
  await loadProductsFetch();

  // Calculate cartQuantity and display to cart icon
  updateCartQuantityDisplay()
  
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
        ${renderProductSummary(order)}
      </div>
    `;
  });

  // Display the generated html
  document.querySelector('.orders-grid').innerHTML = ordersSumarry;

  function renderProductSummary(order) {
    const {products, id} = order;
    
    let html = "";

    products.forEach((product) => {
      const productId = product.productId;
      const productDetails = getMatchingItem(productId);
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
            <button class="buy-again-button button-primary" data-buy-again-btn="${product.productId}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${id}&productId=${productId}">
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

  // buy again buttons
  document.querySelectorAll('.buy-again-button')
    .forEach (button => {

      button.addEventListener('click', () => {
        const productId = button.dataset.buyAgainBtn;

        addToCart(productId);
        updateCartQuantityDisplay();

        button.innerHTML = 'Added';
        setTimeout(() => {
          button.innerHTML = `
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          `;
        },500)
      })
    })

  // Calculate cartQuantity and display to cart icon
  function updateCartQuantityDisplay() {
    const cartQuantity = calculateCartQuantity();
    if (cartQuantity) {
      document.querySelector(".cart-quantity").innerText = cartQuantity;
    } 
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
}