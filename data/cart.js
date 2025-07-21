export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
  let matchingItem;
  const selectorQuantity = Number(document.querySelector(`#quantity-selector-${productId}`).value);
  
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += selectorQuantity;
  } else {
    cart.push({
      productId,
      quantity: selectorQuantity
    });
    localStorage.setItem('cart', JSON.stringify(cart))    
  }
}