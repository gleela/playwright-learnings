require('dotenv').config()
export const loginPayload = {
    userEmail: process.env.EMAIL, userPassword: process.env.PASSWORD
}
export const orderPayload = {
    orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]
}