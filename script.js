const recordForm = document.getElementById("student-form");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const recordList = document.getElementById("record-list");

let records = JSON.parse(localStorage.getItem("records")) || [];
let editIndex = -1;

// Check duplicate email
function isDuplicateEmail(email) {
  return records.some(
    (record, index) =>
      record.email.toLowerCase() === email.toLowerCase() && index !== editIndex
  );
}

// Display records
function displayRecords() {
  recordList.innerHTML = "";

  if (records.length === 0) {
    recordList.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color:red;">
          No Record Found
        </td>
      </tr>
    `;
    return;
  }

  records.forEach((record, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${record.name}</td>
      <td>${record.age}</td>
      <td title="${record.email}">${record.email}</td>
      <td><button onclick="editRecord(${index})">Edit</button></td>
      <td><button onclick="deleteRecord(${index})">Delete</button></td>
    `;

    recordList.appendChild(row);
  });
}

// Add / Update record
recordForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const age = ageInput.value.trim();
  const email = emailInput.value.trim();

  if (name === "" || age === "" || email === "") {
    alert("Please fill all fields!");
    return;
  }

  if (isDuplicateEmail(email)) {
    alert("Student with this email already exists!");
    return;
  }

  if (editIndex === -1) {
    // Add new record
    records.push({ name, age, email });
  } else {
    // Update record
    records[editIndex] = { name, age, email };
    editIndex = -1;
  }

  localStorage.setItem("records", JSON.stringify(records));

  nameInput.value = "";
  ageInput.value = "";
  emailInput.value = "";

  displayRecords();
});

// Edit record
function editRecord(index) {
  nameInput.value = records[index].name;
  ageInput.value = records[index].age;
  emailInput.value = records[index].email;

  editIndex = index;
}

// Delete record with confirm
function deleteRecord(index) {
  let confirmDelete = confirm("Are you sure you want to delete this record?");

  if (confirmDelete) {
    records.splice(index, 1);
    localStorage.setItem("records", JSON.stringify(records));
    displayRecords();
  }
}

// Initial display
displayRecords();
