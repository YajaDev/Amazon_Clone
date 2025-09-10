export function search() {
  const tosearch = document.querySelector('.search-bar').value;
  let url = '';
  if (tosearch) {
    url = `amazon.html?search=${tosearch}`
  }else{
    url = "amazon.html"
  }
  window.location.href = url;
}