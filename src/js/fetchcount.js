let productList = [];

async function getProductsByCount(){
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                productList.push(element.title + "/" + element.id);
            });
            data.sort((a, b) => {
                return b.rating.count - a.rating.count;
            });
            for (let i = 0; i < 10; i++){
                document.getElementById("topproducts").innerHTML += `
                <div>
			    <h3>${data[i].title}</h3>
			    <img src="${data[i].image}" alt="${data[i].title}">
			    <p>${data[i].price} €</p>
                </div>
			`;
            }
        })
        .catch((error) => console.error(error));
}

getProductsByCount();

productList.push("electronics/1","men's clothing/1","women's clothing/1", "jewelery/1");

export default productList;