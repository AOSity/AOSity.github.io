class Model {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    addUser(user) {
        if (user && user.email && user.password) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
        } else {
            console.error('User data is empty or incomplete.');
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    checkLogin(email, password) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        return user && user.email === email && user.password === password;
    }
}