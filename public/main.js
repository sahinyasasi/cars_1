const update1 = document.querySelector("#update-button1");
const update2 = document.querySelector("#update-button2");
const update3 = document.querySelector("#update-button3");
const submitBtn = document.querySelector("#submit");
const carsList = document.querySelector(".cars");
const addedCar = document.querySelector(".addedCar");

update1.addEventListener("submit", (e) => {
  e.preventDefault();
  let brand = document.querySelector(".brand").value;
  let model = document.querySelector(".model").value;
  let variant = document.querySelector(".variant").value;
  console.log(brand);
  addedCar.insertAdjacentHTML(
    "beforeEnd",
    `<p>brand :<span>${brand}</span></p><p>model :<span>${model}</span></p><p>variant :<span>${variant}</span></p>`
  );
});
update2.addEventListener("click", () => {
  addedCar.classList.remove("hidden");
});
update3.addEventListener("click", () => {
  addedCar.classList.remove("hidden");
});
