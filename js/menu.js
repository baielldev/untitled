let list = document.querySelector(".menu");
let modal = document.querySelector(".modal-window");

readFood();
function readFood() {
  list.innerHTML = "";
  let data = JSON.parse(localStorage.getItem("foods")) || [];
  data.forEach((item, idx) => {
    //create
    let box = document.createElement("div");
    box.classList.add("box");
    let img = document.createElement("img");
    img.src = item.file;
    let title = document.createElement("div");
    title.classList.add("title");
    let titleP = document.createElement("p");
    titleP.innerText = item.name;
    let price = document.createElement("div");
    price.classList.add("price");
    let priceP = document.createElement("p");
    priceP.innerText = `$${item.price}`;
    let toOrder = document.createElement("button");
    toOrder.innerText = "to order";

    let icons = document.createElement("div");
    icons.classList.add("icons");
    let iconDel = document.createElement("span");
    iconDel.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
    let iconEdit = document.createElement("span");
    iconEdit.innerHTML = `<ion-icon name="create-outline"></ion-icon>`;
    //append
    icons.append(iconDel, iconEdit);
    box.append(img, title, icons);
    title.append(titleP, price);
    price.append(priceP, toOrder);
    list.append(box);

    box.addEventListener("mouseover", () => {
      icons.style.display = "flex";
    });
    list.addEventListener("mouseleave", () => {
      icons.style.display = "none";
    });

    iconEdit.addEventListener("click", () => {
      modal.style.display = "flex";
      EditFood(idx);
    });

    iconDel.addEventListener("click", () => {
      deleteFood(item.id);
    });

    toOrder.addEventListener("click", () => {
      let newData = JSON.parse(localStorage.getItem("order")) || [];
      let findOrderItem = data.find((el, index) => index === idx);

      if (newData.some((someItem) => someItem.id === item.id)) {
        alert("Этот продукт уже добавлен!!!");
      } else {
        newData.push(findOrderItem);
        localStorage.setItem("order", JSON.stringify(newData));
      }
    });
  });
}

function deleteFood(id) {
  let data = JSON.parse(localStorage.getItem("foods")) || [];
  localStorage.setItem(
    "foods",
    JSON.stringify(data.filter((item, idx) => item.id !== id))
  );
  readFood();
}

let fileEdit = document.querySelector(".editFile");
let nameEdit = document.querySelector(".editName");
let priceEdit = document.querySelector(".editPrice");
let addEdit = document.querySelector(".addBtn");
let iconClose = document.querySelector(".closeIcon");

function EditFood(index) {
  let data = JSON.parse(localStorage.getItem("foods")) || [];
  fileEdit.value = data[index].file;
  nameEdit.value = data[index].name;
  priceEdit.value = data[index].price;
  fileEdit.setAttribute("id", index);
  nameEdit.setAttribute("id", index);
  priceEdit.setAttribute("id", index);
}

addEdit.addEventListener("click", () => {
  let editedText = {
    file: fileEdit.value,
    name: nameEdit.value,
    price: priceEdit.value,
  };
  let data = JSON.parse(localStorage.getItem("foods")) || [];
  data.splice(fileEdit.id && nameEdit.id && priceEdit.id, 1, editedText);
  localStorage.setItem("foods", JSON.stringify(data));
  readFood();
  modal.style.display = "none";
});

iconClose.addEventListener("click", () => {
  modal.style.display = "none";
});
