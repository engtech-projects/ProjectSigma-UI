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

export const exportToCSV = (table: any) => {
    let csv = ""

    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i]
        const rowData = []
        for (let j = 0; j < row.cells.length; j++) {
            const cellData = row.cells[j].textContent
            rowData.push(`"${cellData}"`)
        }
        csv += rowData.join(",") + "\n"
    }

    const blob = new Blob([csv], { type: "text/csvcharset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")

    a.href = url
    a.download = "table.csv"
    a.click()
    URL.revokeObjectURL(url)
}

export const formatToCurrency = (number: Number, locale = "en-US") => {
    const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    return formatter.format(number)
}

export const upperFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const amountToWords = (num: any) => {
    const lessThanTwenty = [
        "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ]
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    const thousands = ["", "Thousand", "Million", "Billion", "Trillion"]

    function helper (n) {
        if (n === 0) {
            return ""
        } else if (n < 20) {
            return lessThanTwenty[n] + " "
        } else if (n < 100) {
            return tens[Math.floor(n / 10)] + " " + helper(n % 10)
        } else {
            return lessThanTwenty[Math.floor(n / 100)] + " Hundred " + helper(n % 100)
        }
    }

    function convertWholePart (n) {
        if (n === 0) {
            return "Zero"
        }

        let word = ""
        let i = 0

        while (n > 0) {
            if (n % 1000 !== 0) {
                word = helper(n % 1000) + thousands[i] + " " + word
            }
            n = Math.floor(n / 1000)
            i++
        }

        return word.trim()
    }

    function convertCents (decimalPart) {
        const cents = Math.round(decimalPart * 100)
        if (cents === 0) {
            return ""
        }
        return "and " + helper(cents) + "Centavos"
    }

    const [wholePart, decimalPart] = num.toString().split(".")
    const wholePartWords = convertWholePart(parseInt(wholePart))
    const centavosWords = decimalPart ? convertCents(parseFloat("0." + decimalPart)) : ""

    if (centavosWords) {
        return wholePartWords + " Pesos " + centavosWords
    } else {
        return wholePartWords + " Pesos"
    }
}

export const sortByProperty = (array, property, sortOrder = "asc") => {
    return array.sort((a, b) => {
        if (sortOrder === "asc") {
            return a[property] > b[property] ? 1 : -1
        } else {
            return a[property] < b[property] ? 1 : -1
        }
    })
}

export const randomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const fullDate = (dateString: any) => {
    const date = new Date(dateString)
    const options = { month: "long", day: "numeric", year: "numeric" }
    return date.toLocaleDateString("en-US", options)
}

export const dateToString = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Pad month with zero
    const day = String(date.getDate()).padStart(2, "0") // Pad day with zero
    return `${year}-${month}-${day}`
}

export const useFirstDateOfMonth = () => {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()
    return new Date(y, m, 1)
}

export const useLastDateOfMonth = () => {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth()
    return new Date(y, m + 1, 0)
}

export const useFormatDateTimeString = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    let hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, "0")
    const ampm = hours >= 12 ? "PM" : "AM"
    hours = hours % 12
    hours = hours ?? 12 // the hour "0" should be '12'
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`
    return formattedDate
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
export const useAmountInWords = (s: any) => {
    const thVal = ["", "Thousand", "Million", "Billion", "Trillion"]
    const dgVal = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]
    const tnVal = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]
    const twVal = ["Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    s = s.toString()
    s = s.replace(/[, ]/g, "")
    // eslint-disable-next-line eqeqeq
    if (s == 0) { return "Zero Only" }
    const numFloatVal = parseFloat(s)
    // eslint-disable-next-line eqeqeq
    if (s != parseFloat(s)) { return "not a number " }
    let xVal = s.indexOf(".")
    if (xVal === -1) { xVal = s.length }
    if (xVal > 15) { return "too big" }
    const nVal = s.split("")
    let strVal = numFloatVal < 0 ? "Negative" : ""
    let skVal = 0
    for (let i = 0; i < xVal; i++) {
        if ((xVal - i) % 3 === 2) {
            if (nVal[i] === "1") {
                strVal += (tnVal[Number(nVal[i + 1])] ?? "") + " "
                i++
                skVal = 1
            } else if (nVal[i] !== 0) {
                strVal += (twVal[nVal[i] - 2] ?? "") + " "
                skVal = 1
            }
        } else if (nVal[i] !== 0) {
            strVal += (dgVal[nVal[i]] ?? "") + " "
            if ((xVal - i) % 3 === 0) { strVal += "hundred " }
            skVal = 1
        }
        if ((xVal - i) % 3 === 1) {
            if (skVal) { strVal += (thVal[(xVal - i - 1) / 3] ?? "") + " " }
            skVal = 0
        }
    }
    if (xVal !== s.length) {
        if (nVal[xVal + 1] !== 0 || nVal[xVal + 2] !== 0) {
            strVal += "Pesos and "
            if (nVal[xVal + 1] === "1") {
                strVal += (tnVal[Number(nVal[xVal + 2])] ?? "") + " "
            } else {
                if (nVal[xVal + 1] >= 2) {
                    strVal += (twVal[nVal[xVal + 1] - 2] ?? "") + " "
                }
                strVal += (dgVal[nVal[xVal + 2]] ?? "")
            }
            strVal += " Centavos"
        } else {
            strVal += "Pesos"
        }
    }
    return strVal.replace(/\s+/g, " ") + " Only"
}
