const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const productsContainer = document.getElementById("all-products");
  productsContainer.textContent = "";
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 text-center shadow-sm rounded border border-5" id="test">
      <div class="bg-body p-3"><img style="width: 150px; height: 150px;" src="${image}" class="card-img-top mx-auto" alt="..."></div>
      <div class="card-body text-white">
        <h5 class="card-title">${product.title}</h5>
        <p>Category: ${product.category}</p>
        <p>Avg Rating: ${product.rating.rate}</p>
        <p>Total Reviews: ${product.rating.count}</p>
        <h2>Price: $ ${product.price}</h2>
      </div>
      <div class="p-3">
      <button onclick="addToCart(${product.price})" id="addToCart-btn" class="buy-now btn btn-warning">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      </div>
    </div>
 
        `;
    productsContainer.appendChild(div);
  }
};

let count = 0;
const addToCart = (price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
