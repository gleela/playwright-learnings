import {test} from '../../fixtures/ui-fixtures'
import {expect} from '@playwright/test'
const fakeOrderResponse = {data:[],message:"No Orders"}

test("verify message display when no order is available in order page", async({loggedInPage})=>{

    await loggedInPage.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69ee3743f86ba51a65890e5b", async route=>{
        const response = await loggedInPage.request.fetch(route.request())
        let body = JSON.stringify(fakeOrderResponse)
        await route.fulfill({
            response,
            body,
        })
    })
    await loggedInPage.getByText('  ORDERS').click()
    await expect(loggedInPage).toHaveURL(/myorders/)
    await loggedInPage.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69ee3743f86ba51a65890e5b")
    await expect(loggedInPage.locator(".mt-4")).toContainText('No Orders')
})