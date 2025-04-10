export const useInventoryUomConvertValue = (quantity: number, fromConversion: number, toConversion: number) => {
    return quantity * (fromConversion / toConversion)
}
