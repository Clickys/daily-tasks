function showEditForm(id) {
    if (document.getElementById('edit-form-' + id).style.display === 'block') {
        document.getElementById('edit-form-' + id).style.display = 'none';
        return;
    }
    document.getElementById('edit-form-' + id).style.display = 'block';
}

// registration
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (response.redirected) {
        const url = new URL(response.url);
        if (url.origin === location.origin) {
            location.assign(response.url);
        } else {
            console.error('Invalid redirect URL:', response.url);
        }
    }
});
