const {test,expect} = require('@playwright/test');

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

    await facebookPage.getByRole('button', { name: 'Decline optional cookies' }).click()
    
    const [accountCreationPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            await facebookPage.getByRole('button', { name: 'Create new account' }).click()
        ]
    ) 
    await accountCreationPage.getByRole('button', { name: 'Decline optional cookies' }).click()
    
    await accountCreationPage.getByLabel("First name").fill("check")
    await accountCreationPage.close()

    await facebookPage.close()
   

})