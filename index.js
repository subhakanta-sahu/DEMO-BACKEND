document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/api/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      return response.json();
    })
    .then((users) => {
      const tableBody = document.querySelector("#users-table tbody");

      users.forEach((user) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = user.id;

        const nameCell = document.createElement("td");
        nameCell.textContent = user.name;

        row.appendChild(idCell);
        row.appendChild(nameCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
