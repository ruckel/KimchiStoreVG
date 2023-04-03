/*
Skriver ut panelen högst upp samt footern längst ned
 */

function panel() {
    const header = document.querySelector("#panel");
    const path = window.location.pathname;
  
    if (path === "../") {
      window.location.pathname = "../index";
    }
  
    header.innerHTML = `
      <nav class="nav">
        <ul>
          <li class="${path.includes("contact") ? "active" : ""}">
            <a href="../contact">Contact us</a>
          </li>
          <li class="${path.includes("produkter") ? "active" : ""}">
            <a href="../produkter">Products</a>
          </li>
          <li class="${path.includes("order") ? "active" : ""}">
            <a href="../order">Order</a>
          </li>
          <li class="${path.includes("index") ? "active" : ""}">
            <a href="../">Home</a>
          </li>
        </ul>
      </nav>
    `;
}

  function footer(){
    const footer = document.querySelector("#footer");
    footer.innerHTML = `
    <div>
    <b>Copyright &copy; 2023 - Melinda Walter, Oscar Jidåker, Kevin Dybeck, Gustav Henriksson - </b>
    
    <a href="https://github.com/ruckel/KimchiStoreVG" style="color: white; font-weight: bold">github</a>
    </div>
    `
}

footer();
  
panel();