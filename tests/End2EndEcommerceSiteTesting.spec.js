const {test,expect} = require('@playwright/test')
require('dotenv').config()

test('verifying successful registration',{tag:'@registration'},async ({page})=>{
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register')
    await page.getByPlaceholder('First Name').fill('check')
    await page.getByPlaceholder('Last Name').fill('check')
    await page.locator('#userEmail').fill(process.env.email)
    await page.getByPlaceholder('enter your number').fill('3333344444')
    await page.locator('.custom-select').selectOption('Doctor')
    await page.getByRole("radio",{name:'Male', exact: true}).check()
    await page.getByPlaceholder('Passsword', {exact: true}).fill(process.dotenv.password)
    await page.getByPlaceholder('Confirm Passsword').fill(process.dotenv.password)
    await page.getByRole("checkbox").check()
    await page.locator('#login').click()

    await expect(page.getByRole('heading', { name: 'Account Created Successfully' })).toBeVisible()
    
})

test('verifying successful login',{tag:'@smoke'},async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.getByPlaceholder("email@example.com").fill(process.env.email)
    await page.getByPlaceholder("enter your passsword").fill(process.dotenv.password)
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/dashboard/)

})

test("verify successful order placing",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.getByPlaceholder("email@example.com").fill(process.env.email)
    await page.getByPlaceholder("enter your passsword").fill(process.env.password)
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/dashboard/)
    const cards = page.locator(".card-body")
    await expect(cards.first()).toBeVisible()
    const products = await page.locator(".card-body h5").allTextContents()
    
    const requiredProduct = 'ZARA COAT 3'

    for(let i=0;i<products.length;i++){
        if(products[i]==requiredProduct){
            await cards.nth(i).getByText(' Add To Cart').click()
            break
        }
    }

    //navigate to basket page
    await page.locator("[routerlink='/dashboard/cart']").click()

    await expect(page).toHaveURL(/cart/)

    expect(await page.locator(".cartSection h3").textContent()).toContain(requiredProduct)

    //navigate to checkout page
    await page.getByRole("button",{name: 'Buy Now'}).click()

    await expect(page).toHaveURL(/order/)
    await page.locator("input[type='text']").nth(1).fill('123')
    await page.locator("input[type='text']").nth(2).fill("check")
    await page.locator("input[name='coupon']").fill("rahulshettyacademy")
    await page.getByRole("button",{name:'Apply Coupon'}).click()
    await page.getByPlaceholder("Select Country").pressSequentially('ind')
    await page.getByText(" India",{exact:true}).click()

    //navigate to order confirmation page
    await page.getByText("Place Order ").click()

    await expect(page).toHaveURL(/thanks/)
    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible()
    const orderNumber = await page.locator('.ng-star-inserted label').last().textContent()


    //navigate to order history page
    await page.getByText(' Orders History Page ').click()

    await expect(page).toHaveURL(/myorders/)
    await expect(page.locator("table")).toBeVisible()
    const orderIds = await page.locator("tbody th").allTextContents()

    const isFound = orderIds.some(element => orderNumber.includes(element))
    expect(isFound).toBeTruthy()

})