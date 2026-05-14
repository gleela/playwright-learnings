const {expect} = require("@playwright/test")
class HomePage{
    constructor(page){
        this.page= page
        this.manageMenu = "//span[text()='Manage']"
        this.manageCourses = "//a[text()='Manage Courses']"

    }

    async navigateToManageCourse(){
       await this.page.click(this.manageMenu)
       await this.page.click(this.manageCourses)
    }

    async verifyManageCourseURL(){
        await expect(this.page).toHaveURL(/manage/)
    }
}module.exports = HomePage