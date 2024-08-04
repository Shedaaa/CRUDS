let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mode = "create";
let tmp;

// Total Price
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// Create
let dataProd;
if (localStorage.product != null) {
  dataProd = JSON.parse(localStorage.product);
} else {
  dataProd = [];
}

submit.onclick = function () {
  let newProd = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    newProd.count < 100
  ) {
    if (mode === "create") {
      if (newProd.count > 1) {
        for (let i = 0; i < newProd.count; i++) {
          dataProd.push(newProd);
        }
      } else {
        dataProd.push(newProd);
      }
    } else {
      dataProd[tmp] = newProd;
      mode = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(dataProd));
  showDate();
};

// Clear
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read
function showDate() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProd.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${dataProd[i].title}</td>
      <td>${dataProd[i].price}</td>
      <td>${dataProd[i].taxes}</td>
      <td>${dataProd[i].ads}</td>
      <td>${dataProd[i].discount}</td>
      <td>${dataProd[i].total}</td>
      <td>${dataProd[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("deleteAll");
  if (dataProd.length > 0) {
    deleteAll.innerHTML = `
    <button onclick="deleteAll()">Delete All (${dataProd.length})</button>
    `;
  } else {
    deleteAll.innerHTML = "";
  }
}
showDate();

// Delete
function deleteData(i) {
  dataProd.splice(i, 1);
  localStorage.product = JSON.stringify(dataProd);
  showDate();
}

function deleteAll() {
  localStorage.clear();
  dataProd.splice(0);
  showDate();
}

// Update
function updateData(i) {
  title.value = dataProd[i].title;
  price.value = dataProd[i].price;
  taxes.value = dataProd[i].taxes;
  ads.value = dataProd[i].ads;
  discount.value = dataProd[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProd[i].category;
  submit.innerHTML = "Update";
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Search
let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMode = "category";
    search.placeholder = "Search By Category";
  }
  search.focus();
  search.value = "";
  showDate();
}

function searchData(value) {
  let table = "";
  if (searchMode == "title") {
    for (let i = 0; i < dataProd.length; i++) {
      if (dataProd[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
    `;
      }
    }
  } else {
    for (let i = 0; i < dataProd.length; i++) {
      if (dataProd[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataProd[i].title}</td>
            <td>${dataProd[i].price}</td>
            <td>${dataProd[i].taxes}</td>
            <td>${dataProd[i].ads}</td>
            <td>${dataProd[i].discount}</td>
            <td>${dataProd[i].total}</td>
            <td>${dataProd[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
