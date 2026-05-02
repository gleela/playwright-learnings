const {expect} = require('@playwright/test')
async function loginHelper(page,email,password){
    await page.getByPlaceholder("you@email.com").fill(email)
    await page.getByLabel("Password").fill(password)
    await page.getByRole("button",{name:'Sign In'}).click()
    await expect(page.locator("a").filter({hasText:"Browse Events →"})).toBeVisible()
}module.exports = {loginHelper}