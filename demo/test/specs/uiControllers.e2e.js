import { expect as expectchai } from "chai";

describe("UI Controls Test Suite", async () => {

    it("UI Controls", async () => {
        await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
        
        const radioButtons = await $$(".customradio");   //$$ взема всички елементи с този клас
        const userRadio = radioButtons[1];
        await userRadio.$("input").click();  //chaining - locators takes the first input present`

        const modal = await $(".modal-content");
        await modal.waitForDisplayed();
        await modal.$("#cancelBtn").click();
        console.log("Clicking cancel button do not change the already selected radiobutton Admin", await $$(".customradio")[0].$("input").isSelected());

        await userRadio.$("input").click();
        await modal.waitForDisplayed();
        await $("#okayBtn").click();

        //validate pop up not shown up when you select admin user
        await $$(".customradio")[0].$("input").click();
        await expect(modal).not.toBeDisplayed();

        //dropdown select
        const dropdown = await $("select.form-control");
        dropdown.selectByAttribute('value', 'teach'); //селектира ни елемент от dropdown менюто
        await dropdown.selectByVisibleText("Consultant");
        await dropdown.selectByIndex(0);
        console.log("currently selected option", await dropdown.getValue());

        //chai assertions
        expectchai(await dropdown.getValue()).to.equal("stud");
    })
})