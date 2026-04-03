const {test,expect} = require('@playwright/test');

test('verify selection of an element using mouse hover method', async ({page})=>{

    await page.goto('https://freelance-learn-automation.vercel.app/login');
    await page.getByPlaceholder('Enter Email').fill('admin@email.com');
    await page.getByPlaceholder('Enter Password').fill('admin@123');
    await page.getByRole('button',{name: 'Sign in'}).click();
    
    await page.locator("//span['@text = Manage']").hover();
    await page.getByAltText('manage course').click();

    await expect(page).toHaveURL(/manage/);

})
