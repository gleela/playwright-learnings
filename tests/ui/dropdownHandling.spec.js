const {test,expect} = require('@playwright/test');

test('Verify dropdown selection', async ({page})=>{

    //selecting an option
    await page.goto("https://freelance-learn-automation.vercel.app/signup");
    await page.locator("#state").selectOption({label: "Goa"});

    //verifying if a specific state is available in the dropdown options
    const stateOptions = await page.locator("#state option").allTextContents();
    expect(stateOptions.includes('Punjab')).toBeTruthy();

    //verifying multiple dropdown selection
    await page.locator("#hobbies").selectOption(['Swimming','Reading']);

})