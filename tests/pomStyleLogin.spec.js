const {test} = require('@playwright/test')
const LoginPage = require('../pages/loginPage.js')
const HomePage = require('../pages/homePage.js')

test('verifying login with pom design pattern', async({page})=>{
    await page.goto('https://freelance-learn-automation.vercel.app/login')

    const loginPage = new LoginPage(page)

    await loginPage.successfulLogin()

    const homePage = new HomePage(page)

    await homePage.navigateToManageCourse()

    await homePage.verifyManageCourseURL()
})