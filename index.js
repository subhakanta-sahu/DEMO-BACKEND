document.addEventListener("DOMContentLoaded", () => {
  // Use relative URL to avoid CORS
  fetch("/api/users")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch users");
      return response.json();
    })
    .then((users) => {
      const tableBody = document.querySelector("#users-table tbody");

      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${user.id}</td><td>${user.name}</td>`;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      const tableBody = document.querySelector("#users-table tbody");
      tableBody.innerHTML = `<tr><td colspan="2">Failed to load users</td></tr>`;
    });
});
