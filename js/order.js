//window.onbeforeunload = function(){ return 'Leave page?'; };

const orderForm = document.querySelector("#order-form")
orderForm.reset();

let cart;
let sum = 0;
const order = document.querySelector('#orders');
const totalPrice = document.querySelector('#totprice');
if (window.localStorage.getItem("cart")) {   // om varor existerar i localstorage presenteras dom i varukorgen
    cart = JSON.parse(window.localStorage.getItem("cart"));

    cart.forEach((element) => {
        sum += element.price * element.quantity;
        order.innerHTML += printProductHTML(element);
    });
    totalPrice.innerHTML = `Total: ${sum.toFixed(2)} €`;

    addition();
    subtraction();
    deletion();
}

const clearCart = document.querySelector('#clear');
clearCart.addEventListener('click', e => {   //Om knappen trycks tas info om produkterna bort och localStorage nollställs
    e.preventDefault();
    if (window.localStorage.getItem("cart")) {
        order.innerHTML = 'Cart emptied';
        totalPrice.innerHTML = null;
        window.localStorage.removeItem("cart");
    }
})

function printProductHTML(product) {   //Skriver ut produkten som HTML
    let elementSum = product.price * product.quantity;
    return `
        <div class="cart">

            <div class="product-and-title">
                <div class="product-img">
                    <img src="${product.imageURL}" alt="${product.title}">
                </div>
                <h3>${product.title}</h3>
            </div>
            
            <p class="action-price">á ${product.price}€</p>

            <div class="quantity">
                <p class="productQuantity">amount: ${product.quantity}</p>
                <button class="addButton" >+</button>
                <button class="subButton" >-</button>
                <button class="xButton" >x</button>
            </div>
            
            <p class="element-sum">${elementSum}€</p>
            </div>
      `;
}

function addition() {
    let addButton = document.getElementsByClassName("addButton");
    let totprice = document.querySelector('#totprice');
    let elSum = document.getElementsByClassName("element-sum");

    Array.prototype.forEach.call(addButton, function (element, index) {
        element.addEventListener('click', e => {
            e.preventDefault();

            cart[index].quantity++;
            sum += cart[index].price;

            document.getElementsByClassName("productQuantity")[index].innerHTML = "amount: " + cart[index].quantity; //justerar antalet som användare ser
            elSum[index].innerHTML = `${cart[index].price * cart[index].quantity}€`; //justerar summan per artikel
            totprice.innerHTML = `Total: ${sum.toFixed(2)}€`; //justerar totalpris

            localStorage.setItem('cart', JSON.stringify(cart));
        })
    })
}

function subtraction() {
    let subButton = document.getElementsByClassName("subButton");
    let totprice = document.querySelector('#totprice');
    let elSum = document.getElementsByClassName("element-sum");

    Array.prototype.forEach.call(subButton, function (element, index) {
        element.addEventListener('click', e => {
            e.preventDefault();

            cart[index].quantity--;
            sum -= cart[index].price;

            document.getElementsByClassName("productQuantity")[index].innerHTML = "amount: " + cart[index].quantity; //justerar antalet som användare ser
            elSum[index].innerHTML = `${cart[index].price * cart[index].quantity}€`; //justerar summan per artikel
            totprice.innerHTML = `Total: ${sum.toFixed(2)}€`; //justerar totalpris

            if (cart[index].quantity <= 0) {   // om antal artiklar når 0 tas artikeln bort från varukorg och localstorage
                cart.splice(index, 1);
                document.getElementsByClassName("cart")[index].remove();
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            } else {   // sparar varukorgen i localstorage
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            if (cart.length === 0) {   //om varukorgen är tom rensas cart från localstorage
                document.querySelector('#remove').classList.add("hidden");
                totprice.innerHTML = null;
                localStorage.removeItem('cart');
            }
        })
    })
}

function deletion() {
    let deleteButton = document.getElementsByClassName("xButton");

    Array.prototype.forEach.call(deleteButton, function (element, index) {
        element.addEventListener('click', e => {
            e.preventDefault();
            cart.splice(index, 1);
            document.getElementsByClassName("cart")[index].remove();
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        })
    })
}