import { expect as expectchai } from "chai";

describe("Functional testing on application", async () => {
    xit("Scrolling and mouse hover", async () => {
        await browser.url("https://rahulshettyacademy.com/AutomationPractice/");
        await browser.pause(3000);
        await $("#mousehover").scrollIntoView(); //скролни до бутона с id mousehover
        await browser.pause(3000);
        await $("#mousehover").moveTo();
        await $("=Top").click();  //go to the element with text Top
        await browser.pause(3000);
    })

    xit("Dialog box pop up", async () => {
        await browser.url("https://only-testing-blog.blogspot.com/2014/09/selectable.html");
        await browser.pause(3000);
        $("button").doubleClick(); //this function does not work on Windows
       
        await browser.pause(10000);
        // expectchai(await browser.isAlertOpen()).to.be.true;  //isAlertOpen works only on Chrome
        expectchai(await browser.getAlertText()).to.equal("You double clicked me.. Thank You.."); //the expected message of the dialog box
        await browser.acceptAlert(); //press ok the dialog box
        await browser.pause(3000);
    })

    xit("Web table sort validation", async () => {
        await browser.url("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        await $("tr th:nth-child(1)").click();

        // retrieve list of veggie names into array A(click sorted)
        const veggiesLocators = await $$('tr td:nth-child(1)'); //initial state of the list
        const originalVeggiesNames = await Promise.all(veggiesLocators.map(async (veggie) => await veggie.getText()));
        console.log("First five veggies click-sorted:", originalVeggiesNames);

        // sort the array A -> Array B creating
        const tempVeggies = originalVeggiesNames.slice(); //take the copy of the array
        const sortedVeggies = tempVeggies.sort(); // Arrays are passed by reference, so tempVeggies are arranged also after sort operation
        console.log("Sorted manually:", sortedVeggies);

        // compare array A(click sorted) and array B (manual sort on the already click sorted array A)
        expectchai(originalVeggiesNames).to.eql(sortedVeggies);
    })

    it("Web table filter validation", async () => {
        await browser.url("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        await $("input[type='search']").setValue("tomato");
        const veggieLocators = $$("tr td:nth-child(1)");
        await expect(veggieLocators).toBeElementsArrayOfSize({eq:1}); //from webdriver UI
        console.log(await veggieLocators[0].getText());
        await expect(await veggieLocators[0]).toHaveTextContaining("omato");
    })
})