let cartItemId = localStorage.getItem("cartItemId") ? parseInt(localStorage.getItem("cartItemId")) : 1;

document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 45.99 },
    { id: 3, name: "Product 3", price: 93.995 },
  ];

  let cart = JSON.parse(localStorage.getItem("items")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMsg = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      // console.log(productId);

      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    const cartItem = {
      cartItemId: cartItemId++, // Assign a unique ID for this cart item
      product: product,
    };
    cart.push(cartItem);
    saveCart()
    localStorage.setItem("cartItemId", cartItemId);
    // console.log(cart);    
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let ttlPrice = 0;

    if (cart.length > 0) {
      emptyCartMsg.classList.add("hidden");
      cartTotal.classList.remove("hidden");
      cart.forEach((item, index) => {
        ttlPrice += item.product.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("remove");
        cartItem.setAttribute("data-cart-item-id",  item.cartItemId);
        cartItem.innerHTML = `  
                ${item.product.name} - $${item.product.price.toFixed(2)}
                <button>Remove</button>
                `;
        cartItems.appendChild(cartItem);
        totalPrice.textContent = `$${ttlPrice.toFixed(2)}`;
        saveCart()
      });
    } else {
      emptyCartMsg.classList.remove("hidden");
      totalPrice.textContent = `$0.00`;
    }
  }

  cartItems.addEventListener("click", (e) => {  //code to remove cart items
    if(e.target.tagName === "BUTTON") {
      const cartItemDiv = e.target.parentNode;
      // console.log(cartItemDiv);      
      const productId = parseInt(cartItemDiv.getAttribute("data-cart-item-id"));
      // console.log(`Clicked item with ID: ${productId}`);
      cartItemDiv.remove()      
      removeToCart(productId)
    }
  })

  function removeToCart(productId) {
    cart = cart.filter(item => item.cartItemId !== productId);
    saveCart()
    renderCart();
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout Successfully");
    renderCart();
  });

  function saveCart() {
    localStorage.setItem("items", JSON.stringify(cart))
  }

  renderCart();
});
