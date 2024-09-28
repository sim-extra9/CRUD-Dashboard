// Khmer number conversion map
const khmerNumbers = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

// Function to convert numbers to Khmer numerals
function convertToKhmerNumber(num) {
    const khmerNum = num.toString().split('').map(digit => khmerNumbers[parseInt(digit)]).join('');
    return `០០${khmerNum}`.slice(-3);  
}

// Email validation function using regular expression
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

// Initialize variables
let id = 1;
let rowEdit = null;
let rowToDelete = null;

// Function to add a row to the table with Khmer number for ID
function addRowToTable(name, email) {
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="id-col">${convertToKhmerNumber(id++)}</td>
        <td>${name}</td>
        <td class="email-col" type='email'>${email}</td>
        <td class="text-center action-col">
            <button class="btn btn-edit bg-success text-white btn-action">កែប្រែ</button>
            <button class="btn btn-delete bg-danger text-white btn-action">លុប</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Function to update localStorage
function updateLocalStorage() {
    const rows = document.querySelectorAll('#table-body tr');
    const data = [];

    rows.forEach(row => {
        const rowId = row.cells[0].textContent;
        const name = row.cells[1].textContent;
        const email = row.cells[2].textContent;
        data.push({ id: rowId, name, email });
    });

    localStorage.setItem('tableData', JSON.stringify(data));
}

// Function to load data from localStorage
function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('tableData')) || [];
    data.forEach(item => {
        addRowToTable(item.name, item.email);
    });
    updateRowIds(); // Ensure IDs are correct
}

// Function to update row IDs
function updateRowIds() {
    const rows = document.querySelectorAll('#table-body tr');
    id = 1; // Reset ID counter
    rows.forEach(row => {
        row.cells[0].textContent = convertToKhmerNumber(id++); // Update with Khmer number
    });
    updateLocalStorage(); // Update localStorage with new IDs
}

// Add event listener for the Add button
document.getElementById('addButton').addEventListener('click', () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const alertBox = document.getElementById('alertBox');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // Validate email and name
    if (name && validateEmail(email)) {
        if (rowEdit) {
            // Update existing row
            rowEdit.cells[1].textContent = name;
            rowEdit.cells[2].textContent = email;
            rowEdit = null;
            document.getElementById('saveUpdate').textContent = 'យល់ព្រម';
        } else {
            // Add new row
            addRowToTable(name, email);
        }

        // Clear inputs
        nameInput.value = '';
        emailInput.value = '';

        // Hide alert if visible
        alertBox.classList.add('d-none');

        // Update localStorage
        updateLocalStorage();
    } else {
        // Show alert with Khmer message for missing or invalid data
        alertBox.textContent = 'សូមបំពេញឈ្មោះ និង Email ដែលត្រឹមត្រូវ!';
        alertBox.classList.remove('d-none');

        // Hide the alert after 3 seconds
        setTimeout(() => {
            alertBox.classList.add('d-none');
        }, 3000);
        setTimeout(3000);
        
    }
});

// Handle click events on table body
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();

    const tableBody = document.getElementById('table-body');
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-delete')) {
            // Set the row to delete and show the modal
            rowToDelete = event.target.closest('tr');
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
            deleteModal.show();
        } else if (event.target.classList.contains('btn-edit')) {
            // Edit the row
            const row = event.target.closest('tr');
            const name = row.cells[1].textContent;
            const email = row.cells[2].textContent;

            // Populate the update form
            document.getElementById('updateName').value = name;
            document.getElementById('updateEmail').value = email;

            // Show the update form (remove 'd-none')
            document.getElementById('updateRow').classList.remove('d-none');

            // Set the row being edited
            rowEdit = row;
            document.getElementById('saveUpdate').textContent = 'កែប្រែ';
        }
    });
});

// Handle the Save Update button
document.getElementById('saveUpdate').addEventListener('click', () => {
    if (rowEdit) {
        const updatedName = document.getElementById('updateName').value.trim();
        const updatedEmail = document.getElementById('updateEmail').value.trim();

        if (updatedName && validateEmail(updatedEmail)) {
            // Update the row data
            rowEdit.cells[1].textContent = updatedName;
            rowEdit.cells[2].textContent = updatedEmail;

            // Clear the update form and hide it
            document.getElementById('updateName').value = '';
            document.getElementById('updateEmail').value = '';
            rowEdit = null;
            document.getElementById('saveUpdate').textContent = 'យល់ព្រម';
            document.getElementById('updateRow').classList.add('d-none');

            // Update localStorage
            updateLocalStorage();
        } else {
            // Optionally, show an alert if fields are empty or invalid
            alertBox.textContent = 'សូមបំពេញឈ្មោះ និង Email ដែលត្រឹមត្រូវ!';
            alertBox.classList.remove('d-none');

            setTimeout(() => {
                alertBox.classList.add('d-none');
            }, 3000);
        }
    }
});

// Handle the Cancel Update button
document.getElementById('cancelUpdate').addEventListener('click', () => {
    // Clear the update form and hide it
    document.getElementById('updateName').value = '';
    document.getElementById('updateEmail').value = '';
    rowEdit = null;
    document.getElementById('saveUpdate').textContent = 'យល់ព្រម';
    document.getElementById('updateRow').classList.add('d-none');
});

// Handle Confirm Delete button in the modal
document.getElementById('confirmDelete').addEventListener('click', () => {
    if (rowToDelete) {
        rowToDelete.remove();
        rowToDelete = null;
        updateRowIds(); // Re-number the IDs with Khmer numerals
    }

    // Hide the modal
    const deleteModalEl = document.getElementById('deleteModal');
    const deleteModal = bootstrap.Modal.getInstance(deleteModalEl);
    deleteModal.hide();

    // Update localStorage
    updateLocalStorage();
});



//Nav Link

// Function to handle adding active class to the clicked link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));

        // Add active class to the clicked link
        this.classList.add('active');
    });
});


// Function to update the user count display
function updateUserCount() {
    const data = JSON.parse(localStorage.getItem('tableData')) || [];
    const userCount = data.length;

    // Update the user count in the HTML
    const userCountElement = document.getElementById('userCountValue');
    if (userCountElement) {
        userCountElement.textContent = `អ្នកប្រើប្រាស់: ${userCount}`;
    }
}
function showSearchBar() {
    var searchInput = document.getElementById("searchInput");
    
    // Toggle the 'd-none' class to show or hide the search bar
    if (searchInput.classList.contains("d-none")) {
        searchInput.classList.remove("d-none");
    } else {
        searchInput.classList.add("d-none");
    }
}
function searchFunction() {
    // Get the search query
    let input = document.getElementById('searchInput').value.toLowerCase();
    let tableRows = document.querySelectorAll('#table-body tr'); // Select all table rows

    // Loop through the table rows and hide those that don't match the query
    tableRows.forEach(function(row) {
        let name = row.cells[1].textContent.toLowerCase(); // Get the name cell content
        let email = row.cells[2].textContent.toLowerCase(); // Get the email cell content

        // Show or hide the row based on the query matching the name or email
        if (name.includes(input) || email.includes(input)) {
            row.style.display = ''; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
}
