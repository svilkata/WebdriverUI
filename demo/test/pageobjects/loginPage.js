class LoginPage {
    get userName() {
        console.log();
        return $("input[name='username']");
    }

    get password() {
        return $("//input[@type='password']");
    }

    get alert() {
        return $(".alert-danger");
    }

    get signIn() {
        return $("#signInBtn");
    }

    get textInfo(){
        return $("p");
    }

    async login(username, password) {
        await this.userName.setValue(username);
        await this.password.setValue(password);
        await this.signIn.click();
    }
}

export default new LoginPage();