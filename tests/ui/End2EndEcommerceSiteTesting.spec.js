import {test} from '../../fixtures/combined-fixtures.js'
const {expect,request} = require('@playwright/test')
import { loginPayload,orderPayload } from '../../test-data/ecommerceSiteData.js'


test('verifying successful registration',{tag:'@registration'},async ({page})=>{
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/register')
    await page.getByPlaceholder('First Name').fill('check')
    await page.getByPlaceholder('Last Name').fill('check')
    await page.locator('#userEmail').fill(loginPayload.userEmail)
    await page.getByPlaceholder('enter your number').fill('3333344444')
    await page.locator('.custom-select').selectOption('Doctor')
    await page.getByRole("radio",{name:'Male', exact: true}).check()
    await page.getByPlaceholder('Passsword', {exact: true}).fill(loginPayload.userPassword)
    await page.getByPlaceholder('Confirm Passsword').fill(loginPayload.userPassword)
    await page.getByRole("checkbox").check()
    await page.locator('#login').click()

    await expect(page.getByRole('heading', { name: 'Account Created Successfully' })).toBeVisible()
    
})

test('verifying successful login',{tag:'@smoke'},async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")

    await page.getByPlaceholder("email@example.com").fill(loginPayload.userEmail)
    await page.getByPlaceholder("enter your passsword").fill(loginPayload.userPassword)
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL(/dashboard/)

})

test("verify successful order placing",async ({loggedInPage})=>{

    const cards = await loggedInPage.locator(".card-body")
    await expect(cards.first()).toBeVisible()
    const products = await loggedInPage.locator(".card-body h5").allTextContents()
    
    const requiredProduct = 'ZARA COAT 3'

    //add product to basket
    for(let i=0;i<products.length;i++){
        if(products[i]==requiredProduct){
            await cards.nth(i).getByText(' Add To Cart').click()
            break
        }
    }

    //navigate to basket page
    await loggedInPage.locator("[routerlink='/dashboard/cart']").click()

    await expect(loggedInPage).toHaveURL(/cart/)

    expect(await loggedInPage.locator(".cartSection h3").textContent()).toContain(requiredProduct)

    //navigate to checkout page
    await loggedInPage.getByRole("button",{name: 'Buy Now'}).click()

    await expect(loggedInPage).toHaveURL(/order/)
    await loggedInPage.locator("input[type='text']").nth(1).fill('123')
    await loggedInPage.locator("input[type='text']").nth(2).fill("check")
    await loggedInPage.locator("input[name='coupon']").fill("rahulshettyacademy")
    await loggedInPage.getByRole("button",{name:'Apply Coupon'}).click()
    await expect(loggedInPage.getByText("* Coupon Applied")).toBeVisible()
    await loggedInPage.getByPlaceholder("Select Country").pressSequentially('ind')
    await expect(loggedInPage.locator("section.list-group")).toBeVisible()
    await loggedInPage.getByText(" India",{exact:true}).click()

    //navigate to order confirmation page
    await loggedInPage.getByText("Place Order ").click()

    await expect(loggedInPage).toHaveURL(/thanks/)
    await expect(loggedInPage.getByText(' Thankyou for the order. ')).toBeVisible()
    const orderNumber = await loggedInPage.locator('.ng-star-inserted label').last().textContent()

})

test("Verify Order history", async({loggedInPage,orderApi,authApi})=>{

    //get token
    const response = await authApi.login(loginPayload)
    const token = (await response.json()).token

    const orderId = await orderApi.createOrder(orderPayload,token)
    //navigate to order history page
    await loggedInPage.getByText('  ORDERS').click()

    await expect(loggedInPage).toHaveURL(/myorders/)
    await expect(loggedInPage.locator("table")).toBeVisible()
    const orderIds = await loggedInPage.locator("tbody th").allTextContents()

    const isFound = await orderIds.some(element => orderId.includes(element))
    expect(isFound).toBeTruthy()

})