import {
  cart,
  updateDeliveryOption,
  removeFromCart,
  calculateCartQuantity,
  updateCartQuantity} from "../../data/cart.js";
import {getMatchingItem} from "../../data/products.js";
import {centToDollar} from "../utils/money.js";
import deliveryOptions from "../../data/deliveryOptions.js";
import renderPaymentSummary from "./paymentSummary.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function renderOrderSummary() {
  let cartSummaryHtml = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    
    const machingProduct = getMatchingItem(productId);

    const deliveryOpionId = Number(cartItem.deliveryOpionId);
    const deliveryOpion = deliveryOptions[deliveryOpionId];
    const deliveryDate = dayjs().add(deliveryOpion.deliveryDays, 'day').format('dddd, MMMM D')
    
    const html =`
      <div class="cart-item-container" id="id-${cartItem.productId}">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
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
                Quantity: <span class="quantity-label" id="quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary" data-update-link-id="${cartItem.productId}">
                Update
              </span>
              <input class="quantity-input" id="quantity-input-${cartItem.productId}">
              <span class="save-quantity-link link-primary" data-save-link-id="${cartItem.productId}">Save</span>
              <span class="delete-quantity-link link-primary" data-delete-link-id="${cartItem.productId}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${deliveryOptionHtml(machingProduct, cartItem)}
          </div>
        </div>
      </div>
    `
  cartSummaryHtml += html;
  });
  
  document.querySelector('.order-summary').innerHTML = cartSummaryHtml;
  UpdateCheckoutQuantity();

  function deliveryOptionHtml(machingProduct,cartItem) {
    let deliveryOptionsHtml = '';

    deliveryOptions.forEach(option => {
      const todayObj = dayjs();
      const deliveryDaysObj = todayObj.add(option.deliveryDays, 'day');
      const deliveryDate = deliveryDaysObj.format('dddd, MMMM D');
      const ShippingFee = !option.priceCents ? 'FREE' : `$${centToDollar(option.priceCents)}`
      const ischeck = option.id === cartItem.deliveryOpionId;

      deliveryOptionsHtml += `
        <label class="delivery-option" 
          data-product-id="${machingProduct.id}"
          data-delivery-option="${option.id}">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${machingProduct.id}" 
            ${ischeck && 'checked'}>
          <div>
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${ShippingFee} - Shipping
            </div>
          </div>
        </label>
        `
    });

    return deliveryOptionsHtml;
  }

  function UpdateCheckoutQuantity() {
    let cartQuantity = calculateCartQuantity();
    
    let display = '';
    if (cartQuantity) {
      cartQuantity === 1 ? display =  ' item': display =  ' items';
    } else cartQuantity = '';
    document.querySelector('.cart-quantity').innerText = (cartQuantity + display);
  }

  // delete link button
  document.querySelectorAll('.delete-quantity-link')
    .forEach((deleteLinkBtn) => {

      deleteLinkBtn.addEventListener('click', () => {

        const productId = deleteLinkBtn.dataset.deleteLinkId;
        removeFromCart(productId);
      
        const container = document.getElementById(`id-${productId}`);
        container.remove();

        UpdateCheckoutQuantity();
        renderPaymentSummary();
      });
    });

  // update link button
  document.querySelectorAll('.update-quantity-link')
    .forEach(updateLinkBtn => {
      updateLinkBtn.addEventListener('click', () => {

        const productId = updateLinkBtn.dataset.updateLinkId;
        document.getElementById(`id-${productId}`).classList.add('is-editing-quality');
        
      });
    });

  document.querySelectorAll('.save-quantity-link')
    .forEach(saveLinkBtn => {
      saveLinkBtn.addEventListener('click',() => {
        const productId = saveLinkBtn.dataset.saveLinkId;
        const newQuantity = Number(document.getElementById(`quantity-input-${productId}`).value);
        if (newQuantity <= 0 || newQuantity >= 1000) {
          alert('Quantity must be a number between 1 and 999')
          return;
        }
        updateCartQuantity(productId, newQuantity);
        UpdateCheckoutQuantity();
        document.getElementById(`quantity-label-${productId}`).innerText = newQuantity;
        document.getElementById(`id-${productId}`)
          .classList.remove('is-editing-quality');
        renderPaymentSummary();
      });
    })

  document.querySelectorAll('.delivery-option')
    .forEach(element => {
      element.addEventListener('change',() => {
        
        const {productId, deliveryOption} = element.dataset;
    
        updateDeliveryOption(productId, deliveryOption);
        renderOrderSummary();
        renderPaymentSummary();
      })
    })
}

export default renderOrderSummary;