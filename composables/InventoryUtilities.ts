// export const useInventoryUomConvertValue = (quantity: number, fromConversion: number, toConversion: number) => {
//     return toConversion * (quantity / fromConversion)
// }
export const useInventoryUomConvertValue = (quantity: number, fromConversion: number, toConversion: number) => {
    return quantity * (fromConversion / toConversion)
}
