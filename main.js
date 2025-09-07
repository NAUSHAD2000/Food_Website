var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeButton = document.querySelector(".close-btn");

cartIcon.addEventListener("click", () =>
  cartTab.classList.add("cart-tab-active")
);
closeButton.addEventListener("click", () =>
  cartTab.classList.remove("cart-tab-active")
);

//productlist
const cardList =document.querySelector('.card-list');
const cartList = document.querySelector('.cart-list');

let productlist = [];

//update total
const cartTotal = document.querySelector('.cart-total');
//update cart value
const cartValue = document.querySelector('.cart-value');

const updateTotals = ()=>{
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll('.item').forEach(item =>{

    const quantity = parseInt(item.querySelector('.quantity-value').textContent);
    const price = parseFloat(item.querySelector('.item-total').textContent.replace('₹',''));
    
    totalPrice += price;
    totalQuantity +=quantity;

  });
  
  cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
}

//hamburger
const hamburger  = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const bars = document.querySelector('.fa-bars');

hamburger.addEventListener('click',()=>mobileMenu.classList.toggle('mobile-menu-active'));
hamburger.addEventListener('click',()=>bars.classList.toggle('fa-xmark'));


//show card in the cart
const showCards = () => {
  productlist.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
    <div class="card-image"><img src="${product.image}"></div>
    <h4>${product.name}</h4>
    <h4 class="price">${product.price}</h4>
    <a href="#" class="btn card-btn">Add to Cart</a>
    `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector('.card-btn');
    cardBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      addToCart(product);
    })
  });
};


//add to cart
let cartProduct =[];

const addToCart = (product) => {
const existingProduct = cartProduct.find(item=> item.id === product.id);
  if(existingProduct){
    alert('item alredy in your cart');
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace('₹',''))


  //cart item
  const cartItem = document.createElement('div');
  cartItem.classList.add('item');

  cartItem.innerHTML = `
  <div class="item-image">
    <img src="${product.image}" alt="">
  </div>

  <div class= "detail">
    <h4>${product.name}</h4>
    <h4 class="item-total">${product.price}</h4>
  </div>

  <div class="flex">
    <a href="#" class="quantity-btn minus">
      <i class="fa-solid fa-minus"></i>
    </a>
    <h4 class="quantity-value">${quantity}</h4>
    <a href="#" class="quantity-btn plus">
      <i class="fa-solid fa-plus"></i>
    </a>

  </div>
  `;

  cartList.appendChild(cartItem);
  updateTotals();
  
  
  
  const quantityValue = cartItem.querySelector('.quantity-value'); 
  const itemTotal = cartItem.querySelector('.item-total');

  //plus button functionality
  const plusBtn = cartItem.querySelector('.plus');
  plusBtn.addEventListener('click',(e)=>{
    e.preventDefault();
      quantity++;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `₹${(price*quantity).toFixed(2)}`;
      updateTotals();

  })

  //minus button functionality
  const minusBtn = cartItem.querySelector('.minus');
  minusBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(quantity>1){
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `₹${(price*quantity).toFixed(2)}`;
      updateTotals();

    }

    //remove and sliding functionality
    else{
      cartItem.classList.add('.slide-out');
      setTimeout(()=>{
        cartItem.remove();
        cartProduct = cartProduct.filter(item => item.id !== product.id);
        updateTotals();

      },300);
      
    }
    

  })

}

//products show in the cart
const initApp = () => {
  fetch("products.json")
    .then((Response) => Response.json())
    .then((data) => {
      productlist = data;
      showCards();
    });
};

initApp();
