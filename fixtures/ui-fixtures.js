import {test as base} from '@playwright/test'
import LoginPage from '../pages/login-page'
import HomePage from '../pages/home-page'
import { loginPayload } from '../test-data/ecommerceSiteData'

export const test = base.extend({
    loginPage: async({page},use)=>{
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    homePage: async({page},use)=>{
        const homePage = new HomePage(page)
        await use(homePage)
    },
    loggedInPage: async({page,request},use)=>{
        //login using api
        const response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data:loginPayload
        })
        const responseJson = await response.json()
        const token = await responseJson.token

        //inject to the browser
        await page.addInitScript(value=>{
            window.localStorage.setItem('token',value)
        },token)
        
        await page.goto("https://rahulshettyacademy.com/client/")
        await use(page)
    }
})