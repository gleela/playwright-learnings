const {test,expect} = require('@playwright/test')
const testData = JSON.parse(JSON.stringify(require('../test-data/multiSetTestData.json')))

test.describe('Verifying data driven test handling',{tag:'@smoke'}, async ()=>{

    for(const data of testData){

        //test.describe(`verifying user login with ${data.id}`, async ()=>{
            
            test(`verifying user login with ${data.id}st dataset`, async ({page})=>{
        
                await page.goto("https://freelance-learn-automation.vercel.app/login")
                await page.getByPlaceholder("Enter Email").fill(data.email)
                await page.getByPlaceholder("Enter Password").fill(data.password)

            })
       // })

   }

})