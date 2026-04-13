const {test,expect} = require('@playwright/test')
const consentHandler = require('../utils/consentHandler') 

test('verify selecting option in a frame', async({page})=>{
    await page.goto('https://docs.oracle.com/javase/8/docs/api/')
    const iframe3 = page.frameLocator('//frame[@name="classFrame"]')
    await consentHandler.handle(page)

    const iframe = page.frameLocator('//frame[@name="packageListFrame"]')
    await iframe.getByText('java.applet').click()
    const iframe2 = page.frameLocator('//frame[@name="packageFrame"]')
    await iframe2.getByText('AppletContext').click()
    expect(await iframe3.getByRole('heading', { name: 'Interface AppletContext' }).textContent()).toContain('Interface AppletContext')

})