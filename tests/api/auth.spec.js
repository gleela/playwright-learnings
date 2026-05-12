import {test} from '../../fixtures/api-fixtures'
import { expect } from '@playwright/test'
require('dotenv').config()
const loginPayload = {userEmail: process.env.EMAIL, userPassword: process.env.PASSWORD}

test('verify login successful',async({authApi})=>{
   const response =  await authApi.login(loginPayload)
   expect(response.status()).toBe(200)
   const responseJson = await response.json()
   expect(responseJson.token).toBeDefined()
})