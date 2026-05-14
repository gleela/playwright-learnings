import {test as base} from '@playwright/test'
import { AuthApi } from "../api/auth-api.js"
import { OrderApi } from '../api/order-api.js'
import { loginPayload, orderPayload } from '../test-data/ecommerceSiteData.js'


export const test = base.extend({
    authApi: async({request},use)=>{
        const authApi = await new AuthApi(request)
        await use(authApi)
        
    },
    orderApi: async({request},use)=>{
        const orderApi = new OrderApi(request)
        await use(orderApi) 
    }
})

