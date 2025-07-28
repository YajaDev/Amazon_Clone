import {
  cart,
  calculateCartQuantity} from "../../data/cart.js";
import {centToDollar} from "../utils/money.js";
import {getMatchingItem} from "../../data/products.js";
import deliveryOptions from "../../data/deliveryOptions.js"

export function renderPaymentSummary() {
  let cartItemPriceInCents = 0;
  let ShippingFeePriceInCents = 0;

  cart.forEach(cartItem => {
    const matchingItem = getMatchingItem(cartItem.productId)
    
    const itemPriceCents = matchingItem.priceCents * cartItem.quantity;
    cartItemPriceInCents += itemPriceCents

    const {deliveryOpionId} = cartItem;
    const deliveryFeeInCents = deliveryOptions[Number(deliveryOpionId)].priceCents
    
    ShippingFeePriceInCents += deliveryFeeInCents;
  });

  const beforeTax = cartItemPriceInCents + ShippingFeePriceInCents;
  const estimatedTax = beforeTax * 0.10;
  
  const totalCost = beforeTax - estimatedTax;
  
  const paymentSummary = 
  `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Item${(calculateCartQuantity() <= 1) ? '' :'s'} (${calculateCartQuantity()}):</div>
    <div class="payment-summary-money">$${centToDollar(cartItemPriceInCents)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${centToDollar(ShippingFeePriceInCents)}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${centToDollar(beforeTax)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${centToDollar(estimatedTax)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${centToDollar(totalCost)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `
  document.querySelector('.payment-summary').innerHTML = paymentSummary;
}

export default renderPaymentSummary;