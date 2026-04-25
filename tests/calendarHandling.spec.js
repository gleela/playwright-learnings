const {test,expect} = require('@playwright/test')

test('calendar input validation', async({page})=>{

    const date = "12"
    const month = "3"
    const year = "2027"
    const expectedSelection = [month,date,year]
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__decade-view__years button").filter({hasText:year}).click()
    await page.locator(".react-calendar__year-view__months button").nth(month-1).click()
    await page.locator("//abbr[text()='"+date+"']").click()
    await page.waitForLoadState('networkidle')

    //asserting the input value in calendar 
    const values = await page.locator(".react-date-picker__inputGroup input")
    for(let i=0;i<expectedSelection.length;i++){
        const value = await values.nth(i+1).inputValue()
        expect(value).toEqual(expectedSelection[i])
    }

    

})