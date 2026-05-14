const {test,expect} = require('@playwright/test')
const consentHandler = require('../../utils/consentHandler')

test("verifying search with auto suggestion selections",async({page})=>{
    await page.goto("https://www.google.com/")

    await consentHandler.handle(page)
    await page.getByTitle("Search").fill('Suresh car travels vij')
    await page.locator("//li[@role='presentation']").getByText('vijayawada', { exact: true }).click()


    /*await page.waitForSelector("//li[@role='presentation']")
    const elements = await page.$$("//li[@role='presentation']")
    for(let i=0;i<elements.length;i++){
        let option = await elements[i].textContent()
        if(option.includes('vijayawada')){
            await elements[i].click()
            break
        }
    }*/

})