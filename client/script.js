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

}


// LOGOUT

function logout(){
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}


// ADD TO CART

const PRODUCTS = [
  {
    productId: "665000000000000000000001",
    productName: "Stylish T-Shirt",
    price: 3900,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    productVarId: null,
    descriptionShort: "Premium Cotton"
  },
  {
    productId: "665000000000000000000002",
    productName: "Running Shoes",
    price: 7900,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    productVarId: null,
    descriptionShort: "Sport Edition"
  },
  {
    productId: "665000000000000000000003",
    productName: "Smartphone",
    price: 55900,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    productVarId: null,
    descriptionShort: "128GB / Black"
  }
];

function getCart(){
  return JSON.parse(localStorage.getItem("cartItems")) || [];
}

function setCart(items){
  localStorage.setItem("cartItems", JSON.stringify(items));
}

function addToCart(productId){
  const selected = PRODUCTS.find((p) => p.productId === toDbId(productId)) || PRODUCTS[0];
  const cartItems = getCart();
  const existing = cartItems.find((item) => item.productId === selected.productId);

  if(existing){
    existing.quantity += 1;
  }else{
    cartItems.push({
      ...selected,
      quantity: 1
    });
  }

  setCart(cartItems);
  alert(selected.productName + " added to cart!");
}

function toDbId(shortId){
  if(shortId === "p1") return "665000000000000000000001";
  if(shortId === "p2") return "665000000000000000000002";
  if(shortId === "p3") return "665000000000000000000003";
  return shortId;
}

function formatNPR(amount){
  return "रु " + amount.toLocaleString("en-NP");
}

function renderCartPage(){
  const cartList = document.getElementById("cartList");
  if(!cartList){
    return;
  }

  const subtotalEl = document.getElementById("subtotal");
  const taxEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");
  const promoInput = document.getElementById("promoCode");
  const promoBtn = document.getElementById("applyPromo");
  const checkoutBtn = document.getElementById("checkoutBtn");

  let discount = 0;

  function paint(){
    const cartItems = getCart();
    cartList.innerHTML = "";

    if(cartItems.length === 0){
      cartList.innerHTML = '<div class="bg-white border border-[#e5ebf5] rounded-xl p-6 text-slate-600">Your cart is empty.</div>';
    }

    cartItems.forEach((item) => {
      const article = document.createElement("article");
      article.className = "bg-white border border-[#e5ebf5] rounded-xl p-4 grid grid-cols-1 md:grid-cols-[120px_1fr_auto] gap-4";
      article.innerHTML = `
        <img class="w-[120px] h-[95px] md:h-[90px] rounded-lg object-cover" src="${item.imageUrl}" alt="${item.productName}">
        <div>
          <h3 class="text-2xl font-bold">${item.productName}</h3>
          <p class="text-slate-500 mt-1 text-sm">Variant: ${item.descriptionShort || "Default"}</p>
          <div class="inline-flex mt-4 rounded-lg border border-slate-300 overflow-hidden">
            <button class="px-3 py-1.5 bg-slate-50 text-slate-700" data-action="dec" data-id="${item.productId}">-</button>
            <span class="px-4 py-1.5 font-semibold">${item.quantity}</span>
            <button class="px-3 py-1.5 bg-slate-50 text-slate-700" data-action="inc" data-id="${item.productId}">+</button>
          </div>
        </div>
        <div class="md:text-right">
          <p class="text-4xl font-extrabold text-[#b50f14]">${formatNPR(item.price * item.quantity)}</p>
          <button class="text-slate-400 text-sm mt-10 md:mt-12 inline-block" data-action="remove" data-id="${item.productId}">Remove</button>
        </div>
      `;
      cartList.appendChild(article);
    });

    const subtotal = getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 0 : 0;
    const taxable = Math.max(subtotal - discount, 0);
    const tax = Math.round(taxable * 0.13);
    const total = taxable + shipping + tax;

    subtotalEl.textContent = formatNPR(subtotal);
    taxEl.textContent = formatNPR(tax);
    totalEl.textContent = formatNPR(total);
  }

  cartList.addEventListener("click", function(e){
    const target = e.target;
    const action = target.getAttribute("data-action");
    const id = target.getAttribute("data-id");
    if(!action || !id){
      return;
    }

    const cartItems = getCart();
    const item = cartItems.find((x) => x.productId === id);
    if(!item){
      return;
    }

    if(action === "inc"){
      item.quantity += 1;
    }
    if(action === "dec" && item.quantity > 1){
      item.quantity -= 1;
    }
    if(action === "remove"){
      const updated = cartItems.filter((x) => x.productId !== id);
      setCart(updated);
      paint();
      return;
    }

    setCart(cartItems);
    paint();
  });

  promoBtn.addEventListener("click", function(){
    const code = promoInput.value.trim().toUpperCase();
    if(code === "SAGE10"){
      const subtotal = getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
      discount = Math.round(subtotal * 0.10);
      alert("Promo applied: 10% off");
    }else if(code === ""){
      discount = 0;
    }else{
      discount = 0;
      alert("Invalid promo code");
    }
    paint();
  });

  checkoutBtn.addEventListener("click", function(){
    if(getCart().length === 0){
      alert("Your cart is empty.");
      return;
    }
    const items = getCart().map((item) => ({
      productId: item.productId,
      productVarId: item.productVarId || null,
      quantity: item.quantity,
      price: item.price
    }));
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmt = discount;
    const grossAmt = Math.max(subtotal - discountAmt, 0);
    const shippingAmt = 0;
    const taxAmt = Math.round(grossAmt * 0.13);
    const netAmt = grossAmt + shippingAmt + taxAmt;

    const orderPayload = {
      userId: null,
      shippingId: null,
      items,
      totalAmt: subtotal,
      discountAmt,
      grossAmt,
      shippingAmt,
      netAmt
    };
    console.log("Order payload (schema-aligned):", orderPayload);
    alert("Checkout payload prepared. See console.");
  });

  paint();
}


// MOBILE MENU

function toggleMenu(){
  document.getElementById("navLinks").classList.toggle("active");
}

renderCartPage();
