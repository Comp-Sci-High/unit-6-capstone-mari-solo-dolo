const createForm = document.querySelector("form")

createForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const bookData = new FormData(createForm)
  const reqBody = Object.fromEntries(bookData)
  console.log(reqBody)
  const response = await fetch("/loaners/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  })

  window.location.href = "/"
})

async function deletebutn(id) {
  await fetch('/loaners/' + id, { method: 'DELETE' });
  window.location.href = "/"
}

async function editstatus(e, id) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const formObject = Object.fromEntries(formData.entries());

  await fetch('/loanerpatch/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formObject)
  });

  window.location.href = '/'
}
