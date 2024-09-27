export const useUtilities = () => {
    const upperFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const upperWords = (str: string) => {
        return str.replace(/\b\w/g, function (match) {
            return match.toUpperCase()
        })
    }
    function formatCurrency (number: Number, locale = "en-US") {
        const formatter = new Intl.NumberFormat(locale, {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        return formatter.format(number)
    }
    function formatTime (time) {
        // Handle potential seconds in the input string
        const timeParts = time.split(":")

        if (timeParts.length === 3) {
            const hours = parseInt(timeParts[0], 10)
            const minutes = parseInt(timeParts[1], 10)
            const seconds = parseInt(timeParts[2], 10)

            if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
                return "Invalid time value. Hours (0-23), Minutes (0-59), Seconds (0-59)"
            }

            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        } else if (timeParts.length === 2) {
            // Handle H:m format for input
            const hours = parseInt(timeParts[0], 10)
            const minutes = parseInt(timeParts[1], 10)

            if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
                return "Invalid time value. Hours (0-23), Minutes (0-59)"
            }

            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00` // Add default seconds if no seconds provided
        } else {
            // Handle invalid input format
            return "Invalid time format. Please use HH:mm or HH:mm:ss"
        }
    }
    function dateToString (date) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0") // Pad month with zero
        const day = String(date.getDate()).padStart(2, "0") // Pad day with zero
        return `${year}-${month}-${day}`
    }
    function addOneDay (dateString) {
        try {
            // Parse the date string into a Date object
            const dateObj = new Date(dateString)
            // Check if the date is valid
            if (isNaN(dateObj.getTime())) {
                alert("Invalid date format. Please use YYYY-MM-DD.")
            }
            // Add one day using Date methods
            dateObj.setDate(dateObj.getDate() + 1)
            // Format the new date object back to YYYY-MM-DD string
            return dateObj.toISOString().slice(0, 10)
        } catch (error) {
            alert(error.message)
            return null// Or return any other default value on error
        }
    }
    function addDaysToDate (date, days) {
        try {
            // Check if date is a valid number
            if (isNaN(date)) {
                alert("Invalid date. Please provide a valid number of days.")
            }

            // Create a copy of the date object to avoid modifying the original
            const newDate = new Date(date)

            // Add the specified number of days
            newDate.setDate(newDate.getDate() + days)

            // Format the new date object to YYYY-MM-DD string
            const year = newDate.getFullYear()
            const month = String(newDate.getMonth() + 1).padStart(2, "0") // Pad month with zero
            const day = String(newDate.getDate()).padStart(2, "0") // Pad day with zero

            return `${year}-${month}-${day}`
        } catch (error) {
            alert(error.message)
            return "" // Or return any other default value on error
        }
    }
    return ref({ upperFirst, upperWords, formatCurrency, formatTime, addOneDay, dateToString, addDaysToDate })
}

export const upperFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const amountToWords = (s: any) => {
    s = s + ""
    const th = ["", "thousand", "million", "billion", "trillion"]
    const dg = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
    const tn = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
    const tw = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
    s = s.toString()
    s = s.replace(/[, ]/g, "")

    let x = s.indexOf(".")
    if (x === -1) {
        x = s.length
    }
    if (x > 15) {
        return "too big"
    }
    const n = s.split("")
    let str = ""
    let sk = 0
    for (let i = 0; i < x; i++) {
        if ((x - i) % 3 === 2) {
            if (n[i] === "1") {
                str += tn[Number(n[i + 1])] + " "
                i++
                sk = 1
            } else if (n[i] !== 0) {
                str += tw[n[i] - 2] + " "
                sk = 1
            }
        } else if (n[i] !== 0) { // 0235
            str += dg[n[i]] + " "
            if ((x - i) % 3 === 0) {
                str += "hundred "
            }
            sk = 1
        }
        if ((x - i) % 3 === 1) {
            if (sk) {
                str += th[(x - i - 1) / 3] + " "
            }
            sk = 0
        }
    }

    if (x !== s.length) {
        const y = s.length
        str += "point "
        for (let i = x + 1; i < y; i++) {
            str += dg[n[i]] + " "
        }
    }
    return upperFirst(str.replace(/\s+/g, " "))
}

export const dateToString = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Pad month with zero
    const day = String(date.getDate()).padStart(2, "0") // Pad day with zero
    return `${year}-${month}-${day}`
}

export const useFormatCurrency = (number: number | string, locale = "en-US") => {
    const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    return formatter.format(number)
}

export const useFormatDateRange = (start: string, end: string) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    const startDate = new Date(start)
    const endDate = new Date(end)

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return "-"
    }

    const startDay = startDate.getDate()
    const startMonth = months[startDate.getMonth()]

    const endDay = endDate.getDate()
    const endMonth = months[endDate.getMonth()]
    const endYear = endDate.getFullYear()

    if (startMonth === endMonth) {
        return `${startMonth} ${startDay}-${endDay}, ${endYear}`
    } else {
        return `${startMonth} ${startDay}-${endMonth} ${endDay}, ${endYear}`
    }
}
export const useMonthName = (id: any) => {
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
    return months[id - 1]
}
