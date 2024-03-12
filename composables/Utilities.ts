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
        })
        return formatter.format(number)
    }
    return ref({ upperFirst, upperWords, formatCurrency })
}
