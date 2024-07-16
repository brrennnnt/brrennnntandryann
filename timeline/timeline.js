// Check if the user is authenticated
var isAuthenticated = sessionStorage.getItem('authenticated');

// If not authenticated and on protected page, redirect to password page
if (!isAuthenticated && window.location.pathname.includes('timeline_s.html')) {
  window.location.href = '../timeline.html';
}

// Handle form submission
document.getElementById('passwordForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var password = document.getElementById('passwordInput').value;

  // Replace 'your_password_here' with your actual password
  if (password === 'bingbongisagoldfish') {
    // Store authentication in session storage
    sessionStorage.setItem('authenticated', true);

    // Redirect to protected content
    window.location.href = 'timeline_s.html';
  } else {
    document.getElementById('message').textContent = 'Incorrect password. Please try again.';
  }
});
