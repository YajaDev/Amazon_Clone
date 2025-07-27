export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToLocalSrorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  const selectorQuantity = Number(document.querySelector(`#quantity-selector-${productId}`).value);
  
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
      cartItem.quantity += selectorQuantity;
    }
  });

  if (!matchingItem) {
    cart.push({
      productId,
      quantity: selectorQuantity
    });
  }
    
  saveToLocalSrorage()
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach(cartItem => {
    !(cartItem.productId === productId) && newCart.push(cartItem);
  });  
  cart = newCart;
  saveToLocalSrorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity
  });
  return cartQuantity;
  }

  export function updateCartQuantity(productId, newQuantity) {
    let matchingItem; 
    cart.forEach(cartItem => {
      if (productId === cartItem.productId) { 
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    saveToLocalSrorage();
  }