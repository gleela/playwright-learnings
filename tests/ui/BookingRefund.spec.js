const {test,expect} = require('@playwright/test')
import { loginPayload } from '../../test-data/ecommerceSiteData'
const {loginHelper} = require('../../utils/loginHelper')


test('verify booking refund eligibility for single ticket', async({page})=>{
    await page.goto("https://eventhub.rahulshettyacademy.com")
    await loginHelper(page,loginPayload.userEmail,loginPayload.userPassword)

    await page.getByRole("link",{name: 'Events',exact:true}).click()
    await expect(page.getByTestId("event-card").first()).toBeVisible()
    await page.getByTestId("event-card").last().getByTestId("book-now-btn").click()

    await page.getByLabel("Full Name").fill("check")
    await page.getByLabel("Email").fill(loginPayload.userEmail)
    await page.getByLabel("Phone Number").fill("0000000000")
    await page.getByRole("button",{name:'Confirm Booking'}).click()

    await page.getByRole("button",{name:'View My Bookings'}).click()
    await expect(page).toHaveURL(/bookings/)
    await page.getByTestId("booking-card").first().getByRole("button",{name:'View Details'}).click()

    await expect(page.getByText("Booking Information")).toBeVisible()
    const text = await page.locator("nav").filter({hasText:'My Bookings'}).last().textContent()
    const bookingRef = text.replace("My Bookings/","").trim()
    const eventTitle = await page.locator("h1").textContent()
   
    await expect(bookingRef[0]===eventTitle[0]).toBeTruthy()

    await page.getByTestId("check-refund-btn").click()
    await expect(page.getByTestId("refund-spinner")).toBeVisible()
    await expect(page.getByTestId("refund-spinner")).toBeHidden({timeout:6000})

    await expect(page.getByTestId("refund-result")).toBeVisible()
    await expect(page.getByTestId("refund-result")).toContainText("Eligible for refund.")
    await expect(page.getByTestId("refund-result")).toContainText(" Single-ticket bookings qualify for a full refund.")

})

test('verify booking refund ineligibility for group ticket', async({page})=>{
    await page.goto("https://eventhub.rahulshettyacademy.com")
    await loginHelper(page,loginPayload.userEmail,loginPayload.userPassword)

    await page.getByRole("link",{name: 'Events',exact:true}).click()
    await expect(page.getByTestId("event-card").first()).toBeVisible()
    await page.getByTestId("event-card").last().getByTestId("book-now-btn").click()

    await page.getByRole("button",{name:"+"}).click()
    await page.getByRole("button",{name:"+"}).click()
    await page.getByLabel("Full Name").fill("check")
    await page.getByLabel("Email").fill(loginPayload.userEmail)
    await page.getByLabel("Phone Number").fill("0000000000")
    await page.getByRole("button",{name:'Confirm Booking'}).click()

    await page.getByRole("button",{name:'View My Bookings'}).click()
    await expect(page).toHaveURL(/bookings/)
    await page.getByTestId("booking-card").first().getByRole("button",{name:'View Details'}).click()

    await expect(page.getByText("Booking Information")).toBeVisible()
    const text = await page.locator("nav").filter({hasText:'My Bookings'}).last().textContent()
    const bookingRef = text.replace("My Bookings/","").trim()
    const eventTitle = await page.locator("h1").textContent()
   
    await expect(bookingRef[0]===eventTitle[0]).toBeTruthy()

    await page.getByTestId("check-refund-btn").click()
    await expect(page.getByTestId("refund-spinner")).toBeVisible()
    await expect(page.getByTestId("refund-spinner")).toBeHidden({timeout:6000})

    await expect(page.getByTestId("refund-result")).toBeVisible()
    await expect(page.getByTestId("refund-result")).toContainText("Not eligible for refund.")
    await expect(page.getByTestId("refund-result")).toContainText("Group bookings (3 tickets) are non-refundable")
})