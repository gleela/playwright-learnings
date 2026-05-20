import {test} from '../../fixtures/ui-fixtures'
import {expect} from '@playwright/test'
const fakeOrderResponse = {data:[],message:"No Orders"}

test("verify message display when no order is available in order page by intercepting network response", async({loggedInPage})=>{

    await loggedInPage.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route=>{
        const response = await loggedInPage.request.fetch(route.request())
        let body = JSON.stringify(fakeOrderResponse)
        await route.fulfill({
            response,
            body,
        })
    })
    await loggedInPage.getByText('  ORDERS').click()
    await expect(loggedInPage).toHaveURL(/myorders/)
    await loggedInPage.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    await expect(loggedInPage.locator(".mt-4")).toContainText('No Orders')
})

test("verify not authorized message display when user is not authorized to view orders by intercepting network response", async({loggedInPage})=>{

    await loggedInPage.getByText('  ORDERS').click()
    await expect(loggedInPage).toHaveURL(/myorders/)
    await loggedInPage.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

    await loggedInPage.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",route=>{
        route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465ba"})
    })

    await loggedInPage.getByRole('button', {name: 'View'}).first().click()
    await expect(loggedInPage.locator(".blink_me")).toContainText('not authorize')
})