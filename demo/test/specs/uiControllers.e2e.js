import { expect as expectchai } from "chai";
// const expectchai = require("chai").expect;

describe("UI Controls Test Suite", async () => {
    it("UI Controls", async () => {
        await browser.url("/loginpagePractise/");
        
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
        await dropdown.selectByAttribute('value', 'teach'); //селектира ни елемент от dropdown менюто
        await dropdown.selectByVisibleText("Consultant");
        await dropdown.selectByIndex(0);
        console.log("currently selected option", await dropdown.getValue());

        console.log(await $$(".customradio")[0].$("span").isSelected());

        //chai assertions
        expectchai(await dropdown.getValue()).to.equal("stud");
    })


    it("Dynamic Dropdown Controls Smoke", async () => {
        await browser.url("/AutomationPractice/");
        await $("#autocomplete").setValue("ind");
        await browser.pause(3000);
        let items = await $$("[class='ui-menu-item'] div");
        for (var i = 0; i < items.length; i++) {
            if (await items[i].getText() === "India") {
                await items[i].click();
                await browser.pause(3000);
            } 
        }
    })

    it("Checkboxes Identification", async () => {
        await browser.url("/AutomationPractice/");
        const elements = await $$("input[type='checkbox']");
        await elements[1].click();
        await browser.pause(3000);
        console.log(await elements[1].isSelected());  //second should be selected only - returning true
        console.log(await elements[2].isSelected()); //returning false
        await browser.saveScreenshot("screenshot.png"); //using screenshot to see what is happening
    })
})