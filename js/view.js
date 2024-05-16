class View {
    constructor() {
        this.registrationForm = document.querySelector('.registration-form');
        this.loginForm = document.querySelector('.login-form');
        this.profilePage = document.querySelector('.profile-page');
    }

    bindRegister(handler) {
        if (this.registrationForm) {
            this.registrationForm.addEventListener('submit', event => {
                event.preventDefault();
                const formData = new FormData(this.registrationForm);
                handler(formData);
            });
        }
    }

    bindLogin(handler) {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', event => {
                event.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                handler(email, password);
            });
        }
    }

    showAlert(message) {
        alert(message);
    }

    redirectToLogin() {
        window.location.href = 'login.html';
    }

    redirectToProfile() {
        window.location.href = 'profile.html';
    }

    getRegisterData(formData) {
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const dob = formData.get('dob');
        const gender = formData.get('gender');
        return { username, email, password, dob, gender };
    }

    displayUserData(userData) {
        const usernamePlaceholder = document.getElementById('username-placeholder');
        usernamePlaceholder.textContent = userData.username;

        const profileDetails = document.querySelector('.profile-details');
        profileDetails.innerHTML = `
            <h4>Information</h4>
            <table class="registration-table">
                <tr>
                    <th>Username:</th>
                    <td>${userData.username}</td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>${userData.email}</td>
                </tr>
                <tr>
                    <th>Date of Birth:</th>
                    <td>${userData.dob}</td>
                </tr>
                <tr>
                    <th>Gender:</th>
                    <td>${userData.gender}</td>
                </tr>
            </table>
        `;
    }

}