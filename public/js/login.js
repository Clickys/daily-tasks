document.querySelector('.login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    // if (response.redirected) {
    //     const url = new URL(response.url);
    //     if (response.status === 200) {
    //         window.location.href = '/tasks';
    //     } else {
    //         console.error('Invalid redirect URL:', response.url);
    //     }
    // }
});
