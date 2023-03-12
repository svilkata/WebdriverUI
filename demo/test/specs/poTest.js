// const LoginPage = require('./loginPage.js');
import loginPage from '../pageobjects/loginPage.js';

describe("Page Object test", async () => {

    it("Login Fail Page", async () => {
        await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await browser.getTitle);
        await expect(browser).toHaveTitleContaining("Rahul Shetty Academy");

        await loginPage.login("rahulshettyacademy", "learning123");

        console.log(await loginPage.alert.getText());
        await browser.waitUntil(async() => await loginPage.signIn.getAttribute('value') === 'Sign In', {
            timeout: 5000,
            timeoutMsg: 'Error message is not showing up'
        });
        console.log(await loginPage.alert.getText());

        await expect(await loginPage.textInfo).toHaveTextContaining("username is rahulshettyacademy and Password is learning");
    })
})