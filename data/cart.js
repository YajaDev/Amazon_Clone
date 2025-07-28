export let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOpionId: '1'
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOpionId: '2'
  }]
}

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
      quantity: selectorQuantity,
      deliveryOpionId: '0'
    });
  }
    
  saveToLocalSrorage();
}

export function updateDeliveryOption(productId, deliveryOpion) {
  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      cartItem.deliveryOpionId = deliveryOpion;
      saveToLocalSrorage();
    };
  });
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