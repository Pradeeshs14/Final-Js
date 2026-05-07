//  API URL
let url = "https://fakestoreapi.com/products";

// 2. Select elements (using querySelector)
let container = document.querySelector("#container");
let searchInput = document.querySelector("#search");
let categorySelect = document.querySelector("#category");
let lowBtn = document.querySelector("#low");
let highBtn = document.querySelector("#high");

//  Store all products
let allProducts = [];

//  Fetch data
function fetchProducts() {
  container.innerText = "Loading...";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      allProducts = data;        // store data
      displayProducts(data);     // show products
    })
    .catch(() => {
      container.innerText = "Failed to load data";
    });
}

//  Display products
function displayProducts(products) {

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerText = "No products found";
    return;
  }

  products.forEach(product => {

    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}">
      <h3>${product.title.substring(0, 50)}</h3>
      <p><strong>₹ ${product.price}</strong></p>
      <p>${product.description.substring(0, 60)}...</p>

      <button class="view">View More</button>
      <button class="cart">Add to Cart</button>
    `;

    // View More button
    card.querySelector(".view").addEventListener("click", function() {
      alert(product.title + "\n\n" + product.description);
    });

    // Add to Cart
    card.querySelector(".cart").addEventListener("click", function() {
      addToCart(product.id);
    });

    container.appendChild(card);
  });
}

//  Search
searchInput.addEventListener("input", function(e) {

  let value = e.target.value.toLowerCase();

  let filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});

//  Category Filter
categorySelect.addEventListener("change", function(e) {

  let value = e.target.value;

  if (value === "all") {
    displayProducts(allProducts);
  } else {
    let filtered = allProducts.filter(p => p.category === value);
    displayProducts(filtered);
  }
});

//   Sort
lowBtn.addEventListener("click", function() {
  let sorted = [...allProducts].sort((a, b) => a.price - b.price);
  displayProducts(sorted);
});

highBtn.addEventListener("click", function() {
  let sorted = [...allProducts].sort((a, b) => b.price - a.price);
  displayProducts(sorted);
});

//   Add to Cart 
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(id);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart!");
}

//  Start app
fetchProducts();