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
})