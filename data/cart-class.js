class Cart {
  #cartName;
  cartItems;

  constructor(cartName) {
    this.#cartName = cartName;
    this.#loadFormStorage();
  }

  #loadFormStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#cartName));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOpionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOpionId: "2",
        },
      ];
    }
  }

  saveToLocalSrorage() {
    localStorage.setItem(this.#cartName, JSON.stringify(this.cartItems));
  }

  addToCart(productId, selectorQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
        cartItem.quantity += selectorQuantity;
      }
    });

    if (!matchingItem) {
      this.cartItems.push({
        productId,
        quantity: selectorQuantity,
        deliveryOpionId: "0",
      });
    }

    this.saveToLocalSrorage();
  }

  updateDeliveryOption(productId, deliveryOpion) {
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.deliveryOpionId = deliveryOpion;
        this.saveToLocalSrorage();
      }
    });
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      !(cartItem.productId === productId) && newCart.push(cartItem);
    });

    this.cartItems = newCart;
    this.saveToLocalSrorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });

    return cartQuantity;
  }

  updateCartQuantity(productId, newQuantity) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;
    this.saveToLocalSrorage();
  }
}

/*
  const myCart = new Cart("myCart");
  console.log(myCart);

  const cartKo = new Cart("cartKo");
  console.log(cartKo);
*/

export default Cart;