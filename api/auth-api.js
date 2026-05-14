class AuthApi{

    constructor(request){
        this.request = request
    }

    async login(loginPayload){
        const loginResponse = await this.request.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data: loginPayload
        })
        return loginResponse      
    }
}module.exports = {AuthApi}