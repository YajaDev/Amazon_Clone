export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToLocalSrorage();
}

function saveToLocalSrorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}
