// const LoginPage = require('./loginPage.js');
import loginPage from '../pageobjects/loginPage.js';
import shopPage from '../pageobjects/shopPage.js';
import { expect as expectchai } from "chai";
import reviewPage from '../pageobjects/reviewPage.js';

import fs from "fs";
let credentials = JSON.parse(fs.readFileSync('test/testdata/loginTest.json'));
let productcredentials = JSON.parse(fs.readFileSync('test/testdata/e2etest.json'));

describe("Page Object test", async () => {

    xit("Login Fail Page", async () => {
        await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await browser.getTitle);
        await expect(browser).toHaveTitleContaining("Rahul Shetty Academy");

        await loginPage.login(credentials[0].username, credentials[0].password);
        console.log(await loginPage.alert.getText());

        await browser.waitUntil(async () => await loginPage.signIn.getAttribute('value') === 'Sign In', {
            timeout: 5000,
            timeoutMsg: 'Error message is not showing up'
        });
        console.log(await loginPage.alert.getText());
        await expect(await loginPage.textInfo).toHaveTextContaining("username is rahulshettyacademy and Password is learning");
    })


    productcredentials.forEach((productsToAdd) => {
        it("End to End Test", async () => {
            await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
            await loginPage.login("rahulshettyacademy", "learning"); //we are here now: http://rahulshettyacademy.com/angularpractice/shop
            await shopPage.checkout.waitForExist(); //link Text and wait until checkout button is displayed
            await shopPage.addProductsToCart(productsToAdd.products);
            await shopPage.checkout.click(); //clicking the link
    
            const sumPriceProducts = await reviewPage.sumPriceOfProducts();
            const totalIntegerValue = await reviewPage.totalFormattedIntegerValue();
            expectchai(sumPriceProducts).to.equal(totalIntegerValue);
            await $(".btn-success").click();
    
            await $("#country").setValue("ind");
            await $(".lds-ellipsis").waitForExist({ reverse: true }); //will wait to appear and will then wait to disappear
            await $("=India").click();
            await $("input[type='submit']").click();
            await expect($(".alert-success")).toHaveTextContaining("Success! Thank you! Your order w");
        })
    }) 

})