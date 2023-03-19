describe("Windows and Frames Miscellanous", async () => {

    it("Parent and Child windows switch", async () => {
        await browser.url("/loginpagePractise/"); //window is open by automation WebdriverUI
        await browser.pause(3000);
        await $(".blinkingText").click();

        const handles = await browser.getWindowHandles(); //how many windows/tabs are open at the moment

        // switchToWindow - when windows are open by application from the webpage
        await browser.switchToWindow(handles[1]); //go the second CHILD windows/tab //window is open by application from the webpage
        await browser.pause(3000);
        console.log(await $("h1").getText());
        console.log(await browser.getTitle()); //RS Academy
        await browser.closeWindow(); //closing the actively switched window
        await browser.pause(3000);

        await browser.switchToWindow(handles[0]); //return back to PARENT window
        console.log(await browser.getTitle()); //LoginPage Practise | Rahul Shetty Academy
        await browser.pause(3000);

        // go directly and open brand new window
        await browser.newWindow("https://rahulshettyacademy.com"); //no need to switch here //window is open by automation WebdriverUI
        // focused on the last open window
        // works only on Chrome:
        console.log(await browser.getTitle()); //Selenium, API Testing, Software Testing &amp; More QA Tutorials  | Rahul Shetty Academy
        
        // switchWindow - when windows is open by automation WebdriverUI
        await browser.switchWindow("https://rahulshettyacademy.com/loginpagePractise/");

        await $("#username").setValue("helloIswitchedback");
        await browser.pause(3000);
    })

    it("Frames switch", async () => {
        await browser.url("/AutomationPractice/");
        await $("#mousehover").scrollIntoView();
        const linksCount = await $$("a").length; //27
        console.log(linksCount);

        await browser.switchToFrame(await $("[id='courses-iframe']"));
        console.log(await $("=Courses").getTagName());
        console.log(await $$("a").length); //107

        await browser.switchToFrame(null); //exiting the iframe and going back to normal page
        console.log(await $$("a").length); //27
    })
})