import { expect as expectchai } from "chai";

describe("Ecommerce Application", async () => {

    it("End to End Test", async () => {
        await browser.url("/loginpagePractise/");
        await $("input[name='username']").setValue("rahulshettyacademy");
        const password = $("//input[@type='password']");
        await password.setValue("learning");
        await $("#signInBtn").click();
        //wait until checkout button is displayed
        const link = await $("*=Checkout"); //* means partial element text matching  //link a text   !!!browser chrome should be maximized
        // const link = await $("a[class='nav-link btn btn-primary']");
        await link.waitForExist();

        // we are here now: http://rahulshettyacademy.com/angularpractice/shop
        const products = ['iphone X', 'Blackberry'];

        const cards = await $$("div[class='card h-100']");
        for (let i = 0; i < cards.length; i++) {
            const cardTitle = await cards[i].$("div h4 a").getText();
            console.log(cardTitle);

            if (products.includes(cardTitle)) {
                await cards[i].$(".card-footer button").click();
            }
        }

        await link.click();
 
        const chosenProductPrices = await $$("//tr/td[4]/strong"); // in css it will be: tr td:nth-child(4) strong
        const sumPriceProducts = (await Promise.all(chosenProductPrices.map(async productPrice => parseInt((await productPrice.getText()).split(".")[1].trim()))))
        .reduce((acc, price) => acc + price, 0);
        console.log(sumPriceProducts);

        const totalIntegerValue = parseInt((await $("h3 strong").getText()).split(".")[1].trim());
        expectchai(sumPriceProducts).to.equal(totalIntegerValue);

        await $(".btn-success").click();
        await (await $("#country")).setValue("ind");
        await $(".lds-ellipsis").waitForExist({reverse:true}); //will wait to appear and will then wait to disappear
        await $("=India").click();
        await $("input[type='submit']").click();
        await expect($(".alert-success")).toHaveTextContaining("Success! Thank you! Your order w");
    })
})