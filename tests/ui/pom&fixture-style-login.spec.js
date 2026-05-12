import { test } from '../../fixtures/ui-fixtures'

test('verifying login with pom design pattern', async({loginPage,homePage})=>{

    await loginPage.successfulLogin()

    await homePage.navigateToManageCourse()

    await homePage.verifyManageCourseURL()
})