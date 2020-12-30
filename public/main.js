const update = document.querySelector("#update-button");
const submitBtn = document.querySelector("#submitBtn");

update.addEventListener("click", (req, res) => {
  fetch("/cars", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      brand: req.body.brand,
      model: req.body.model,
      variant: req.body.variant,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});
