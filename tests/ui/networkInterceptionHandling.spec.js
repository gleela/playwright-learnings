import {test} from '../../fixtures/ui-fixtures'
import {expect} from '@playwright/test'
import {loginHelper} from '../../utils/loginHelper'
import {loginPayload} from '../../test-data/ecommerceSiteData'
const fakeOrderResponse = {data:[],message:"No Orders"}
const sixEventsResponse = {
    data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo',    category: 'Conference',  eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
}
const fourEventsResponse = {
    success: true,
    data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live',  category: 'Concert',    eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals',       category: 'Sports',     eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
}

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

test("verify sandbox banner message display when more than 5 events are in the page by intercepting network response", async({page})=>{

    await page.goto("https://eventhub.rahulshettyacademy.com")
    await loginHelper(page,loginPayload.userEmail,loginPayload.userPassword)
    
    await page.route("https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12", async route=>{
        const response = await page.request.fetch(route.request())
        let body = JSON.stringify(sixEventsResponse)
        await route.fulfill({
            response,
            body,
        })
    })
    await page.getByRole("link",{name: 'Events',exact:true}).click()
    await expect(page.getByTestId("event-card").first()).toBeVisible()
    await expect(page.getByTestId("event-card")).toHaveCount(6)
    await expect(page.locator("span").filter({hasText:"sandbox holds up to"})).toBeVisible()
    await expect(page.locator("span").filter({hasText:"sandbox holds up to"})).toContainText("9 bookings")

})

test("verify sandbox banner message not display when less than 5 events are in the page by intercepting network response", async({page})=>{

    await page.goto("https://eventhub.rahulshettyacademy.com")
    await loginHelper(page,loginPayload.userEmail,loginPayload.userPassword)
    
    await page.route("https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12", async route=>{
        const response = await page.request.fetch(route.request())
        let body = JSON.stringify(fourEventsResponse)
        await route.fulfill({
            response,
            body,
        })
    })
    await page.getByRole("link",{name: 'Events',exact:true}).click()
    await expect(page.getByTestId("event-card").first()).toBeVisible()
    await expect(page.getByTestId("event-card")).toHaveCount(4)
    await expect(page.locator("span").filter({hasText:"sandbox holds up to"})).not.toBeVisible()
})