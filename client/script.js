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

function addToCart(){
  alert("Product added to cart!");
}


// MOBILE MENU

function toggleMenu(){
  document.getElementById("navLinks").classList.toggle("active");
}