describe("UI Controls Test Suite", async () => {

    it("UI Controls", async () => {
        await browser.url("https://rahulshettyacademy.com/loginpagePractise/");
        await $("input[name='username']").setValue("rahulshettyacademy");
        const password = $("//input[@type='password']");
        await password.setValue("learning");
        await $("#signInBtn").click(); //becomes signing

        const radioButtons = await $$(".customradio");   //$$ взема всички елементи с този клас
        const userDropdown = radioButtons[1];
        await userDropdown.$("span").click();  //chaining - locators takes the first span present`

        const modal = await $(".modal-body");
        await modal.waitForDisplayed();
        await (await $("#cancelBtn")).click();
        console.log(await (await $$(".customradio")[0].$("span")).isSelected());


    })
})