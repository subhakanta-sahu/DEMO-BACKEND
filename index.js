const form = document.getElementById("userForm");
const usersTable = document.getElementById("users");

loadUsers();
const API_URL = "https://demo-backend-production-2861.up.railway.app";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(`${API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  form.reset();
  loadUsers();
});

function loadUsers() {
  fetch(`${API_URL}/api/users`, { cache: "no-store" })
    .then((res) => res.json())
    .then((data) => {
      usersTable.innerHTML = "";
      data.forEach((u) => {
        usersTable.innerHTML += `
          <tr>
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
          </tr>
        `;
      });
    });
}
