/*
Skriver ut panelen högst upp samt footern längst ned
 */

function panel() {
    const header = document.querySelector("#panel");
    const path = window.location.pathname;
  
    if (path === "../src/") {
      window.location.pathname = "../src/index";
    }
  
    header.innerHTML = `
      <nav class="nav">
        <ul>
          <li class="${path.includes("/contact.html") ? "active" : ""}">
            <a href="../src/contact">Contact us</a>
          </li>
          <li class="${path.includes("/produkter.html") ? "active" : ""}">
            <a href="../src/produkter">Products</a>
          </li>
          <li class="${path.includes("/order.html") ? "active" : ""}">
            <a href="../src/order">Order</a>
          </li>
          <li class="${path.includes("/index.html") ? "active" : ""}">
            <a href="../src/">Home</a>
          </li>
        </ul>
      </nav>
    `;
}

  function footer(){
    const footer = document.querySelector("#footer");
    footer.innerHTML = `
    <b>Copyright &copy; 2023 - Melinda Walter, Oscar Jidåker, Kevin Dybeck, Gustav Henriksson</b>
    `
}

footer();
  
panel();