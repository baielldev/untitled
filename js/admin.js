let file = document.querySelector(".file");
let name = document.querySelector(".name");
let price = document.querySelector(".price");
let create = document.querySelector(".create");
let photo = document.querySelector(".photo");
create.innerHTML = `
    <a href="./menu.html">
        <button>add</button>
    </a>
`;

create.addEventListener("click", () => {
  if (!file.value.trim() || !name.value.trim() || !price.value.trim()) {
    alert("Заполните поле!!!");
  } else {
    let obj = {
      file: file.value,
      name: name.value,
      price: price.value,
      id: Date.now(),
    };
    let data = JSON.parse(localStorage.getItem("foods")) || [];
    data.push(obj);
    localStorage.setItem("foods", JSON.stringify(data));
    file.value = "";
    name.value = "";
    price.value = "";
  }
});
