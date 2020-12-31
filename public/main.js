const update1 = document.querySelector("#update-button1");
const update2 = document.querySelector("#update-button2");
const update3 = document.querySelector("#update-button3");
const submitBtn = document.querySelector("#submit");
const carsList = document.querySelector(".cars");

update1.addEventListener("click", () => {
  carsList.classList.remove("hidden");
});
update2.addEventListener("click", () => {
  carsList.classList.remove("hidden");
});
update3.addEventListener("click", () => {
  carsList.classList.remove("hidden");
});
