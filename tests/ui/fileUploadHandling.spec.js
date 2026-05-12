const {test,expect} = require('@playwright/test')

test('verify successful file upload',async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/upload')
    await page.locator('#file-upload').setInputFiles("./test-data/uploads/image.jpg")
    await page.locator('#file-submit').click()

    await expect(page.locator("//h3")).toHaveText("File Uploaded!")
})

test('verify successful file removal',async ({page})=>{
    await page.goto('https://the-internet.herokuapp.com/upload')
    await page.locator('#file-upload').setInputFiles("./test-data/uploads/image.jpg")
    await page.locator('#file-upload').setInputFiles([])
})