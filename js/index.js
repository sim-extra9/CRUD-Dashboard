// Initialize variables
let id = 1;
let rowEdit = null;
let rowToDelete = null;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

// Function to convert English numbers to Khmer numbers
function convertToKhmerNumbers(num) {
    const khmerNumbers = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
    return num.toString().split('').map(digit => khmerNumbers[digit]).join('');
}

// Function to add a row to the table
function addRowToTable(name, email) {
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="id-col">${convertToKhmerNumbers(id++)}</td>
        <td>${name}</td>
        <td class="email-col">${email}</td>
        <td class="text-center action-col">
            <button class="btn btn-edit bg-primary text-white btn-action">កែប្រែ</button>
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
        row.cells[0].textContent = convertToKhmerNumbers(id++);
    });
    updateLocalStorage(); // Update localStorage with new IDs
}

// Rest of your JavaScript logic (unchanged)

// Add event listener for the Add button
document.getElementById('addButton').addEventListener('click', () => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const alertBox = document.getElementById('alertBox');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name && email) {
        // Validate email
        if (!emailRegex.test(email)) {
            alertBox.textContent = 'អ៊ីមែលមិនត្រឹមត្រូវទេ!';
            alertBox.classList.remove('d-none');

            setTimeout(() => {
                alertBox.classList.add('d-none');
            }, 3000);
            return;
        }

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
        // Show alert
        alertBox.textContent = 'សូមបំពេញទិន្នន័យទាំងអស់!';
        alertBox.classList.remove('d-none');

        // Hide the alert after 3 seconds
        setTimeout(() => {
            alertBox.classList.add('d-none');
        }, 3000);
    }
});

// Remaining JavaScript logic unchanged...
