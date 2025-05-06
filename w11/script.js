// Initialize users array from localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

function toggleForms() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
}

// Registration Handler
document.getElementById('register').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = {
        name: document.getElementById('regName').value.trim(),
        email: document.getElementById('regEmail').value.trim(),
        mobile: document.getElementById('regMobile').value.trim(),
        dob: document.getElementById('regDob').value,
        city: document.getElementById('regCity').value.trim(),
        address: document.getElementById('regAddress').value.trim(),
        username: document.getElementById('regUsername').value.trim(),
        password: document.getElementById('regPassword').value
    };

    // Simple validation
    if (!user.name || !user.email || !user.mobile || !user.dob || 
        !user.city || !user.address || !user.username || !user.password) {
        showError('regError', 'All fields are required');
        return;
    }

    if (users.some(u => u.username === user.username)) {
        showError('regError', 'Username already exists');
        return;
    }

    // Add to local storage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Simulate AJAX POST
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registration successful:', data);
        alert('Registration successful!');
        toggleForms();
        this.reset();
    })
    .catch(error => {
        console.error('Registration error:', error);
        showError('regError', 'Registration failed. Please try again.');
    });
});

// Login Handler
document.getElementById('login').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Find user
    const user = users.find(u => u.username === username && u.password === password);

    // Simulate AJAX POST
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
            'Content-type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        if (user) {
            console.log('Login successful:', data);
            alert(`Welcome back, ${user.name}!`);
            this.reset();
        } else {
            showError('loginError', 'Invalid username or password');
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        showError('loginError', 'Login failed. Please try again.');
    });
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    setTimeout(() => errorElement.classList.add('hidden'), 3000);
}