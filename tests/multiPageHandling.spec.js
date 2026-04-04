const {test,expect} = require('@playwright/test')
const consentHandler = require('../utils/consentHandler')

test('verifying handling of multiple pages', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://freelance-learn-automation.vercel.app/login')

    const [facebookPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            await page.locator("//a[contains(@href,'facebook')]").first().click()
        ]
    )
    await facebookPage.waitForLoadState("domcontentloaded")
    await consentHandler.handle(facebookPage)
    
    const [forgotPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            //await facebookPage.getByText('Create new account').click()
            await facebookPage.getByRole('link', { name: 'Forgotten password?' }).click()
        ]
    ) 
    await forgotPage.waitForLoadState("domcontentloaded")
    
    await forgotPage.getByLabel("Mobile number or email").fill("check")
    await forgotPage.close()

    await facebookPage.close()
   

})