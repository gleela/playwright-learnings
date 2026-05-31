class OrderApi{
    constructor(request){
        this.request = request
    }

    async createOrder(orderPayload,token){
        const orderResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
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
}module.exports = {OrderApi}
