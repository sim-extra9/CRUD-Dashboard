const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const signInForm = document.getElementById("signInForm");
const errorMessage = document.getElementById("error-message");


signInForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Check credentials
  if (username === 'admin' && password === '1234') {
    // Store login state in local storage
    localStorage.setItem('isLoggedIn', 'true');
    // Redirect to profile page or home
    window.location.href = "src/pages/dashboard.html"; // Replace with actual profile page URL
  }
  else {
      // Show error message
      errorMessage.textContent = "Your Input Username or wrong password"; 
      errorMessage.style.display = "block";
      // Clear inputs after failed attempt
      document.getElementById('username').value = "";
      document.getElementById('password').value = "";
  }
});