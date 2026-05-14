// REGISTER

const registerForm = document.getElementById("registerForm");

if(registerForm){

  registerForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const message = document.getElementById("registerMessage");

    if(password !== confirmPassword){
      message.style.color = "red";
      message.innerText = "Passwords do not match";
      return;
    }

    const user = {
      name,
      email,
      password
    };

    localStorage.setItem("user", JSON.stringify(user));

    message.style.color = "green";
    message.innerText = "Registration successful";

    setTimeout(()=>{
      window.location.href = "index.html";
    },1500);

  });

}


// LOGIN

const loginForm = document.getElementById("loginForm");

if(loginForm){

  loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const message = document.getElementById("loginMessage");

    if(
      storedUser &&
      email === storedUser.email &&
      password === storedUser.password
    ){

      localStorage.setItem("loggedIn", true);

      message.style.color = "green";
      message.innerText = "Login successful";

      setTimeout(()=>{
        window.location.href = "home.html";
      },1000);

    }else{

      message.style.color = "red";
      message.innerText = "Invalid email or password";

    }

  });

}


// CHECK LOGIN

if(window.location.pathname.includes("home.html")){

  const isLoggedIn = localStorage.getItem("loggedIn");

  if(!isLoggedIn){
    window.location.href = "index.html";
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if(user){
    document.getElementById("userName").innerText = user.name;
  }

  initCart();

}


// LOGOUT

function logout(){
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}


// ADD TO CART

function addToCart(button){
  const productCard = button.closest(".product-card");
  const item = {
    id: productCard.dataset.id,
    name: productCard.dataset.name,
    price: Number(productCard.dataset.price),
    quantity: 1
  };

  const cart = getCart();
  const existingItem = cart.find((product) => product.id === item.id);

  if(existingItem){
    existingItem.quantity += 1;
  }else{
    cart.push(item);
  }

  saveCart(cart);
  renderCart();
}

function getCart(){
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function initCart(){
  renderCart();
}

function renderCart(){
  const cart = getCart();
  const cartItemsEl = document.getElementById("cartItems");
  const cartCountEl = document.getElementById("cartCount");
  const cartTotalEl = document.getElementById("cartTotal");
  const orderItemsCountEl = document.getElementById("orderItemsCount");
  const orderSubtotalEl = document.getElementById("orderSubtotal");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCountEl.innerText = totalItems;
  cartTotalEl.innerText = `$${subtotal.toFixed(2)}`;
  if(orderItemsCountEl){
    orderItemsCountEl.innerText = totalItems;
  }
  if(orderSubtotalEl){
    orderSubtotalEl.innerText = `$${subtotal.toFixed(2)}`;
  }

  if(!cart.length){
    cartItemsEl.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    return;
  }

  cartItemsEl.innerHTML = cart
    .map((item) => `
      <div class="cart-row">
        <div>
          <p><strong>${item.name}</strong></p>
          <p>$${item.price} × ${item.quantity}</p>
        </div>
        <button onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `)
    .join("");
}

function removeFromCart(productId){
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function toggleCart(){
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("overlay");
  drawer.classList.toggle("open");
  overlay.classList.toggle("show");
}

function closePanels(){
  const drawer = document.getElementById("cartDrawer");
  const modal = document.getElementById("orderModal");
  const overlay = document.getElementById("overlay");
  drawer.classList.remove("open");
  modal.classList.remove("open");
  overlay.classList.remove("show");
}

function openOrderModal(){
  const cart = getCart();
  const orderMessage = document.getElementById("orderMessage");

  if(!cart.length){
    orderMessage.style.color = "#d93455";
    orderMessage.innerText = "Add at least one product before placing an order.";
    toggleCart();
    return;
  }

  document.getElementById("orderModal").classList.add("open");
  document.getElementById("overlay").classList.add("show");
  document.getElementById("cartDrawer").classList.remove("open");
  orderMessage.innerText = "";
}

function closeOrderModal(){
  document.getElementById("orderModal").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}

const orderForm = document.getElementById("orderForm");

if(orderForm){
  orderForm.addEventListener("submit", function(e){
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const paymentMethod = document.getElementById("paymentMethod").value;
    const orderMessage = document.getElementById("orderMessage");

    if(!fullName || !phone || !address || !paymentMethod){
      orderMessage.style.color = "#d93455";
      orderMessage.innerText = "Please complete all order details.";
      return;
    }

    orderMessage.style.color = "#2f7d4d";
    orderMessage.innerText = "Order placed successfully! We'll contact you soon.";
    localStorage.removeItem("cart");
    renderCart();
    orderForm.reset();
  });
}

// MOBILE MENU

function toggleMenu(){
  document.getElementById("navLinks").classList.toggle("active");
}
