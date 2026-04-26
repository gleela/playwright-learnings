async function loginHelper(page,email,password){
    await page.getByPlaceholder("you@email.com").fill(email)
    await page.getByLabel("Password").fill(password)
    await page.getByRole("button",{name:'Sign In'}).click()
}module.exports = {loginHelper}