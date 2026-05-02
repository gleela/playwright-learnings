class LoginApi{

    constructor(apiContext,loginPayload){
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data: this.loginPayload
        })
        const loginResponseJson = await loginResponse.json()
        const token = await loginResponseJson.token
        return token
    }

    async getOrder(orderPayload){
        const token = await this.getToken(this.loginPayload)
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data: orderPayload,
            headers : {
                "Authorization" : token,
                "Content-Type" : "application/json"
            }
        })
        const orderResponseJson = await orderResponse.json()
        const orderId = await orderResponseJson.orders[0]
        return orderId
    }
}module.exports = {LoginApi}