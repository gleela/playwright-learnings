const {test,expect} = require('@playwright/test')
const consentHandler = require('../utils/consentHandler')

test('verifying handling of multiple pages', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://freelance-learn-automation.vercel.app/login')

    const [facebookPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            page.locator("//a[contains(@href,'facebook')]").first().click()
        ]
    )
    await facebookPage.waitForLoadState("domcontentloaded")
    await consentHandler.handle(facebookPage)
    
    const [accountCreationPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            facebookPage.getByRole('button', { name: 'Create new account' }).click()
        ]
    ) 
    await accountCreationPage.waitForLoadState("domcontentloaded")
    await consentHandler.handle(accountCreationPage)
    
    await accountCreationPage.getByLabel("First name").fill("check")
    await accountCreationPage.close()

    await facebookPage.close()
   

})