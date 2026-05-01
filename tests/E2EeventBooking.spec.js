const {test,expect} = require('@playwright/test')
require('dotenv').config()
const {futureDateValue} = require('../utils/FutureDateValueHelper')
const {loginHelper} = require('../utils/loginHelper')


test('verify event creation and booking', async({page})=>{
    await page.goto("https://eventhub.rahulshettyacademy.com")
    await loginHelper(page,process.env.EMAIL,process.env.PASSWORD)

    await page.getByRole("button",{name:'Admin'}).click()
    await page.getByRole('navigation').getByRole("link",{name: 'Manage Events'}).click()

    const eventName = `TestEvent ${Date.now()}`
    await expect(page).toHaveURL(/events/)
    await page.getByPlaceholder("Event title").fill(eventName)
    await page.getByPlaceholder("Describe the event…").fill("Bussiness Proposals Desc")
    await page.getByLabel("city").fill('Moon')
    await page.getByLabel("venue").fill('chiller')
    await page.getByLabel("Event Date & Time").fill(futureDateValue())
    await page.getByLabel("Price ($)").fill("100")
    await page.getByLabel("Total Seats").fill("50")
    await page.getByRole("button",{name:'+ Add Event'}).click()

    await page.getByRole("link",{name: 'Events',exact:true}).click()
    await expect(page.getByTestId("event-card").first()).toBeVisible()
    const events = await page.getByTestId("event-card")
    await expect(events.filter({hasText:eventName})).toBeVisible()
    const myEvent = await events.filter({hasText:eventName})
    const seatsBeforeBooking = parseInt(await myEvent.getByText(/seats/).textContent(),10)
    await myEvent.getByText('Book Now').click()

    await expect(await page.locator(".ticket-count").innerText()).toEqual("1")
    await page.getByLabel("Full Name").fill("check")
    await page.getByLabel("Email").fill(process.env.EMAIL)
    await page.getByLabel("Phone Number").fill("0000000000")
    await page.getByRole("button",{name:'Confirm Booking'}).click()

    const text = await page.locator("div").filter({hasText:'Booking Ref'}).last().innerText()
    const bookingRef = await text.replace("Booking Ref","").trim()

    await page.getByRole("button",{name:'View My Bookings'}).click()
    await expect(page).toHaveURL('/bookings')

    const bookings =  page.getByTestId("booking-card")
    await expect(bookings.first()).toBeVisible()
    const myBooking =  bookings.filter({hasText:bookingRef})
    await expect(myBooking).toBeVisible()
    await expect(myBooking.locator("h3")).toHaveText(eventName) 

    await page.getByRole("link",{name: 'Events',exact:true}).click()
    await expect(page.getByTestId("event-card").first()).toBeVisible()
    await expect(page.getByTestId("event-card").filter({hasText:eventName})).toBeVisible()
    await page.waitForLoadState("networkidle")
    const seatsAfterBooking = await parseInt(await page.getByTestId("event-card").filter({hasText:eventName}).getByText(/seats/).innerText(),10)
    await expect(seatsAfterBooking===seatsBeforeBooking-1).toBeTruthy()


})