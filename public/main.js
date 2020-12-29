const update = document.querySelector("#update-button");

update.addEventListener("click", (req, res) => {
  fetch("/cars", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      brand: "123",
      model: "123",
      variant: "123",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});
