document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const contentDiv = document.querySelector(`[data-name-id="${id}"]`);
    const newTitle = prompt("Введите новое значение:", contentDiv.textContent);
    if (!newTitle) {
      return;
    }

    contentDiv.textContent = newTitle;

    edit(id, newTitle).then(() => {
      contentDiv.textContent = newTitle;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      title: title,
    }),
  });
}
