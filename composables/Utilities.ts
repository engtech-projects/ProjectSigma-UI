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
    return ref({ upperFirst, upperWords, formatCurrency, formatTime, addOneDay })
}
