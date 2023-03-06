describe("Windows and Frames Miscellanous", async () => {

    it("Parent and Child windows switch", async () => {
        await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
        await $(".blinkingText").click();

        const handles = await browser.getWindowHandles(); //how many windows/tabs are open at the moment

        await browser.switchToWindow(handles[1]); //go the second CHILD windows/tab
        console.log(await $("h1").getText());
        console.log(await browser.getTitle()); //RS Academy
        await browser.closeWindow(); //closing the actively switched window

        await browser.switchToWindow(handles[0]); //return back to PARENT window
        console.log(await browser.getTitle()); //LoginPage Practise | Rahul Shetty Academy

        // go directly and open brand new window
        await browser.newWindow("https://google.com");
        // focused on the last open window
        console.log("---I AM HERE---", await browser.getTitle()); //Selenium, API Testing, Software Testing &amp; More QA Tutorials  | Rahul Shetty Academy
        

    })
})