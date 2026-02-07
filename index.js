const form = document.getElementById("userForm");
const usersTable = document.getElementById("users");

loadUsers();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  form.reset();
  loadUsers();
});

function loadUsers() {
  fetch("/api/users")
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

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
  hasPassword: !!process.env.DB_PASSWORD,
});
