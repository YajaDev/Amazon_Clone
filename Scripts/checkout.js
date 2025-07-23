import {cart,removeFromCart,calculateCartQuantity} from "../data/cart.js";
import {products} from "../data/products.js";
import {centToDollar} from "./utils/money.js";

let cartSummaryHtml = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  
  let machingProduct = {};

  products.forEach((product) => {

    if (product.id === productId) {
      machingProduct = product;
    }
  });

  const html =`
    <div class="cart-item-container" id="id-${cartItem.productId}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${machingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${machingProduct.name}
          </div>
          <div class="product-price">
            $${centToDollar(machingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary" data-delete-link-id="${cartItem.productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${machingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${machingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${machingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  cartSummaryHtml += html;
});
document.querySelector('.order-summary').innerHTML = cartSummaryHtml;
UpdateCheckoutQuantity();

document.querySelectorAll('.delete-quantity-link')
  .forEach((deleteLinkBtn) => {

    deleteLinkBtn.addEventListener('click', () => {

      const productId = deleteLinkBtn.dataset.deleteLinkId;
      removeFromCart(productId);
    
      const container = document.getElementById(`id-${productId}`);
      container.remove();

      UpdateCheckoutQuantity();
    });
  });

function UpdateCheckoutQuantity() {
  let cartQuantity = calculateCartQuantity();
  
  let display = '';
  if (cartQuantity) {
    cartQuantity === 1 ? display =  ' item': display =  ' items';
  } else cartQuantity = '';
  document.querySelector('.cart-quantity').innerText = (cartQuantity + display);
}