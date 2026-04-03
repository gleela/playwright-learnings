const {test} = require('@playwright/test')


test('verifying search using keyboard action',async({page})=>{
    await page.goto("https://www.google.com/")
    await page.getByRole('button', { name: 'Reject all' }).click()
    await page.getByTitle("Search").fill('Suresh car travels vijayawada')
    await page.keyboard.press('Enter')
})

test('verifying backspace on a word', async({page})=>{
    await page.goto("https://www.google.com/")
    await page.getByRole('button', { name: 'Reject all' }).click()
    await page.getByTitle("Search").focus()
    await page.keyboard.type('Suresh car travels!')
    await page.keyboard.press("ArrowLeft")
    await page.keyboard.down("Shift")
    for(let i=0;i<'travels'.length;i++){
        await page.keyboard.press("ArrowLeft")
    }
    await page.keyboard.up("Shift")
    await page.keyboard.press("Backspace")
    
})