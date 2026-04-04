const {test,expect} = require('@playwright/test')
const consentHandler = require('../utils/consentHandler')

test('verifying handling of multiple pages', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://freelance-learn-automation.vercel.app/login')

    //navigating to facebook page
    const [facebookPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            page.locator("//a[contains(@href,'facebook')]").first().click()
        ]
    )
    await facebookPage.waitForLoadState("domcontentloaded")
    await consentHandler.handle(facebookPage)

    //navigating to facebook forgot password page
    const newPagePromise =  context.waitForEvent('page').catch(()=>null)
    await facebookPage.getByRole('link', { name: 'Forgotten password?' }).click()

    const newPage = await newPagePromise
    const forgotPage = newPage && !newPage.isClosed() ? newPage: browser.contexts()[0].pages()[1]

    await consentHandler.handle(forgotPage)
    
    await forgotPage.waitForLoadState("domcontentloaded")
    
    const email = forgotPage.getByText("Mobile number or email address",{exact:true})
    await email.waitFor({state: "visible",timeout:60000})
    await email.fill("check")
    if(newPage!=null) {
        await forgotPage.close()
    }
    await facebookPage.close()
   

})