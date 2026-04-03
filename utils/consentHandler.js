class consentHandler{
    static async handle(page){
        const selectors = [
            await page.getByRole('button', { name: 'Reject all' }),
            await page.getByRole('button', { name: 'Decline all' }),
            await page.getByRole('button', { name: 'Decline optional cookies' })
        ]

        for(const button of selectors){
            try {
                if(await button.isVisible({timeout:3000})){
                await button.click()
                return
            }
                
            } catch (error) {
               //ignore and continue 
            }
            
        }
    }
}module.exports = consentHandler