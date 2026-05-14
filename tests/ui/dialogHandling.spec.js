const {test,expect} = require('@playwright/test')

test('validating alert text', async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    page.on("dialog", async(dialogWindow)=>{
        expect(dialogWindow.type()).toContain("alert")
        expect(dialogWindow.message()).toContain("I am a JS Alert")
        await dialogWindow.accept()
    } )

    await page.getByRole("button",{name: "Click for JS Alert"}).click()

    expect(await page.locator("#result").textContent()).toContain("You successfully clicked an alert")
})

test('validating confirm text', async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    page.on('dialog',async(dialogWindow)=>{
        expect(dialogWindow.type()).toContain('confirm')
        expect(dialogWindow.message()).toContain('I am a JS Confirm')
        await dialogWindow.dismiss()
    })

    await page.getByRole('button',{name:'Click for JS Confirm'}).click()

    expect(await page.locator('#result').textContent()).toContain('You clicked: Cancel')
})

test('validating prompt handling', async ({page})=>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    page.on('dialog',async(dialogWindow)=>{
        expect(dialogWindow.type()).toContain('prompt')
        expect(dialogWindow.message()).toContain('I am a JS prompt')
        await dialogWindow.accept('Hurray!')
    })

    await page.getByRole('button',{name: 'Click for JS Prompt'}).click()

    expect(await page.locator('#result').textContent()).toContain('You entered: Hurray!')
})