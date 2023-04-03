import Product from "./product.js";


let product; //Tom variabel för produkten
let cart = [];


if (window.sessionStorage.getItem("productID") == null){
    window.location.replace("../produkter"); //Om användaren skriver in URLen utan produktID tas användaren till alla produkter
} else {
    const id = window.sessionStorage.getItem("productID"); //Hämtar id på produkten som valts

    getProductById(id); //fetchar produkten med det IDet samt tilldelar produkt variabeln till att bli den produkt som hämtas

    const orderButton = document.querySelector("#ORDER"); //add to cart knapp och dess lyssnare
    orderButton.addEventListener('click', (e) => {
      e.preventDefault();


      if(cart.filter(p => p.id === product.id).length === 0){
        cart.push();
      } else {
          cart.forEach((element) => {
              if (element.id === product.id) {
                  element.quantity++;
              }
          })
      }
              window.localStorage.setItem("cart", JSON.stringify(cart));

        document.querySelector("#ORDER").innerHTML = 'ADDED TO CART';

        console.log(cart);
    })
}

//fetcha valda produkten baserat på ID
//Lägg till produkten som hämtas som ett produkt objekt och spara
//den i variabeln product
//samt skriv ut produktens info i HTML
async function getProductById(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
        product = new Product(
          data.id,
          data.title,
          data.price,
          data.category,
          data.description,
          data.image,
          1
        );
        //Skriver ut produkten i HTML taggar
        setHTMLValues(
          product
        );
    })
    .catch((error) => console.error(error));
}

//Funktion för att sätta HTML värden
function setHTMLValues(product){

  document.querySelector('#singleProductImg').innerHTML = `<img src="${product.imageURL}" alt="${product.title}">`;
  document.querySelector('#titleInfo').innerHTML = `
      <h3 >${product.title}</h3>
      <p class="singleProductDesc">${product.description}</p>
  `;
  document.querySelector('#price').innerHTML = `<span>${product.price}€</span>`;
}