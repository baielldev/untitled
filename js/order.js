let listOrder = document.querySelector(".order");
let total = document.querySelector(".total");
readOrder();
function readOrder() {
  listOrder.innerHTML = "";
  let newData = JSON.parse(localStorage.getItem("order")) || [];
  let totalPrice = newData.reduce((acc, el) => acc + +el.price, 0);
  newData.forEach((orderItem, orderIdx) => {
    let count = 1;
    let orderBox = document.createElement("div");
    orderBox.classList.add("order-box");
    let orderImg = document.createElement("img");
    orderImg.src = orderItem.file;
    let orderMenu = document.createElement("div");
    orderMenu.classList.add("order-menu");
    let orderH2 = document.createElement("h2");
    orderH2.innerText = orderItem.name;
    let orderP = document.createElement("p");
    orderP.innerText = `${orderItem.price}$`;
    let orderAction = document.createElement("div");
    orderAction.classList.add("order-action");
    let orderBtn = document.createElement("button");
    orderBtn.innerText = "delete order";
    let orderNav = document.createElement("nav");
    let navP1 = document.createElement("p");
    navP1.innerHTML = "-";
    let navH3 = document.createElement("h3");
    navH3.innerText = `${count}x`;
    let navP2 = document.createElement("p");
    navP2.innerText = "+";
    let toOrderDiv = document.createElement("div");
    toOrderDiv.classList.add("order-btn");
    let toOrder_btn = document.createElement("button");
    toOrder_btn.innerText = "to order";
    total.innerText = `Total: $${totalPrice}`;

    orderBox.append(orderImg, orderMenu, orderAction);
    orderMenu.append(orderH2, orderP);
    orderAction.append(orderBtn, orderNav);
    orderNav.append(navP1, navH3, navP2);
    listOrder.append(orderBox);

    orderBtn.addEventListener("click", () => {
      deleteOrder(orderItem.id);
    });

    navP2.addEventListener("click", () => {
      count++;
      navH3.innerText = `${count}x`;
      orderP.innerText = `${orderItem.price * count}$`;
      total.innerText = `Total: $${(totalPrice += +orderItem.price)}`;
    });

    navP1.addEventListener("click", () => {
      if (count !== 1) {
        count--;
        navH3.innerText = `${count}x`;
      }
      orderP.innerText = `${orderItem.price * count}$`;
      total.innerText = `Total: $${(totalPrice -= +orderItem.price)}`;
    });
  });
}

function deleteOrder(id) {
  let newData = JSON.parse(localStorage.getItem("order")) || [];
  localStorage.setItem(
    "order",
    JSON.stringify(newData.filter((el) => el.id !== id))
  );
  readOrder();
}
