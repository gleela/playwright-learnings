const {test,expect} = require("@playwright/test");

test("Verify successfull login and logout", async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").pressSequentially("Admin",{delay:100});
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", {name : 'Login'}).click();
    await expect(page,'user logged in').toHaveURL(/dashboard/);

    await page.getByAltText("profile picture").click();
    await page.getByText("Logout").click();
    await expect(page, 'user logged out').toHaveURL(/login/);
})

test("Verify Login error message", async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").pressSequentially("Admin",{delay:100});
    await page.getByPlaceholder("Password").fill("admin1234");
    await page.getByRole("button", {name : 'Login'}).click();

    const errorMessage = await page.getByRole("alert").textContent();
    await expect(errorMessage.includes('Invalid')).toBeTruthy();
})
