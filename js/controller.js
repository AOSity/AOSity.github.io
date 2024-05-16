class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    initialize() {
        if (this.view.registrationForm) {
            this.view.bindRegister(this.handleRegister.bind(this));
        } else if (this.view.loginForm) {
            this.view.bindLogin(this.handleLogin.bind(this));
        } else if (this.view.profilePage) {
            this.displayProfileData();
        }
    }

    displayProfileData() {
        console.log('Displaying profile data');
        const userData = this.model.getCurrentUser();
        if (userData) {
            console.log('User data:', userData);
            this.view.displayUserData(userData);
        } else {
            console.error('No user data found.');
            this.view.showAlert('Not active user. Register or Login first!');
            this.view.redirectToLogin();
        }
    }

    handleRegister(formData) {
        const user = this.view.getRegisterData(formData);
        console.log('Attempting to register user:', user);
        this.model.addUser(user);
        this.view.showAlert('Registration successful');
        this.view.redirectToLogin();
    }

    handleLogin(email, password) {
        console.log('Attempting to login with email:', email);
        const isLoginValid = this.model.checkLogin(email, password);
        if (isLoginValid) {
            console.log('Login successful');
            this.view.redirectToProfile();
        } else {
            console.error('Login failed');
            this.view.showAlert('Login failed. Please check your email and password.');
        }
    }
}