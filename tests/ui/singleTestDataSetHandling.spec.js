const {test,expect} = require('@playwright/test')
const testData = JSON.parse(JSON.stringify(require('../../test-data/testData.json')))


test('Verifying test data injection from json file', async ({page})=>{

    await page.goto("https://freelance-learn-automation.vercel.app/signup");

    await page.getByPlaceholder("Name").fill(testData.name)
    await page.getByPlaceholder("Email").fill(testData.email)
    await page.getByPlaceholder("Password").fill(testData.password)

    /*for(const element of testData.interests)
        { 
            await page.getByLabel(element).check()
        }
            */
    await page.locator("//input[@value='Female']").check()
    await page.locator("#state").selectOption(testData.state)

    await page.locator("#hobbies").selectOption([testData.hobbies[0],testData.hobbies[1]])   

})