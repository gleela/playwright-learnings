function futureDateValue(daysAhead=1){
        const date = new Date()

        date.setDate(date.getDate() + daysAhead)
        const year = date.getFullYear()
        const month = String(date.getMonth()+1).padStart(2,'0')
        const day = String(date.getDate()).padStart(2,'0')
        const hrs = String(date.getHours()).padStart(2,'0')
        const mins = String(date.getMinutes()).padStart(2,'0')

        return `${year}-${month}-${day}T${hrs}:${mins}`
}
module.exports = {futureDateValue}