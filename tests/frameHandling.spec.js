const {test,expect} = require('@playwright/test')

test('verify selecting option in a frame', async({page})=>{
    await page.goto('https://docs.oracle.com/javase/8/docs/api/')
    const iframe3 = await page.frameLocator('//frame[@name="classFrame"]')
    await iframe3.getByRole("button",{name: 'Decline all'}).click()
    const iframe = await page.frameLocator('//frame[@name="packageListFrame"]')
    await iframe.getByText('java.applet').click()
    const iframe2 = await page.frameLocator('//frame[@name="packageFrame"]')
    await iframe2.getByText('AppletContext').click()
    expect(await iframe3.getByRole('heading', { name: 'Interface AppletContext' }).textContent()).toContain('Interface AppletContext')

})