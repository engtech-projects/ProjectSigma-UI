<script lang="ts" setup>
import { Workbook } from "exceljs"
import { saveAs } from "file-saver"
import { useResourceStore } from "~/stores/project-monitoring/resource"

const resourceStore = useResourceStore()
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
const letterHeader = (index: number) => {
    const base = Math.floor(index / 26)
    const remainder = index % 26
    return String.fromCharCode(65 + remainder) + (base > 0 ? String.fromCharCode(65 + base - 1) : "")
}
async function exportToExcel () {
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet("Detailed Estimates")

    // Contract Information
    worksheet.addRow(["Contract ID", props.data.project_contract_id])
    worksheet.addRow(["Contract Name", props.data.project_name])
    worksheet.addRow(["Contract Location", props.data.project_location])
    worksheet.addRow([])

    worksheet.addRow(["Detailed Estimates"])
    worksheet.mergeCells("A5:E5")
    worksheet.getCell("A5").alignment = { horizontal: "center" }
    worksheet.getCell("A5").font = { bold: true }
    worksheet.getRow(5).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
    }

    // Item Description
    worksheet.addRow(["ITEM NO.", "ITEM DESCRIPTION", "QTY", "UNIT"])
    worksheet.addRow([
        props.data.name,
        props.data.description,
        props.data.quantity,
        props.data.unit,
    ])
    worksheet.addRow([])

    // Resources
    resourceStore.resourceNames.forEach((resource: any, index: number) => {
        worksheet.addRow([letterHeader(index) + ". " + resource.label, "", "", "", ""]).eachCell((cell) => {
            cell.border = {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: undefined },
                right: { style: undefined }
            }
            cell.font = { bold: true }
            cell.alignment = { horizontal: "left" }
        })
        if (resource.label.toLowerCase() === "materials") {
            worksheet.addRow(["NAME AND SPECIFICATION", "QUANTITY", "UNIT", "UNIT COST", "AMOUNT"]).eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: undefined },
                    right: { style: undefined }
                }
                cell.alignment = { horizontal: "left" }
            })
        }
        if (resource.label.toLowerCase() === "labor") {
            worksheet.addRow(["NAME AND SPECIFICATION", "NO OF PERSON", "NO. OF HRS.", "HOURLY RATE", "AMOUNT"]).eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: undefined },
                    right: { style: undefined }
                }
                cell.alignment = { horizontal: "left" }
            })
        }
        if (resource.label.toLowerCase() === "equipment") {
            worksheet.addRow(["NAME AND SPECIFICATION", "NO OF EQUIPMENT", "NO. OF HRS.", "HOURLY RATE", "AMOUNT"]).eachCell((cell) => {
                cell.border = {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: undefined },
                    right: { style: undefined }
                }
                cell.alignment = { horizontal: "left" }
            })
        }
        filterResources(resource.label).forEach((item: any) => {
            worksheet.addRow([
                item.description,
                item.quantity,
                item.unit,
                item.unit_cost,
                item.total_cost,
            ])
        })
        worksheet.addRow(["", "", "", "Direct " + resource.label + " Cost", accountingCurrency(totalDirectCost(resource.label))]).eachCell((cell) => {
            cell.font = { bold: true }
        })
        worksheet.addRow([])
    })

    // Cost Summary
    const directCostRow = worksheet.addRow(["D. DIRECT COST", "", "", "", accountingCurrency(props.data?.direct_cost)])
    directCostRow.eachCell((cell) => {
        cell.border = {
            top: { style: "thin" },
            bottom: { style: undefined },
            left: { style: undefined },
            right: { style: undefined }
        }
    })
    directCostRow.getCell(1).border = {
        top: { style: "thin" },
        bottom: { style: undefined },
        left: { style: "thin" },
        right: { style: undefined }
    }
    directCostRow.getCell(5).border = {
        top: { style: "thin" },
        bottom: { style: undefined },
        left: { style: undefined },
        right: { style: "thin" }
    }
    const ocmRow = worksheet.addRow(["E. O.C.M.", "10.00% of D", "", "", accountingCurrency(props.data?.direct_cost * 0.1)])
    ocmRow.getCell(1).border = {
        top: { style: undefined },
        bottom: { style: undefined },
        left: { style: "thin" },
        right: { style: undefined }
    }
    ocmRow.getCell(5).border = {
        top: { style: undefined },
        bottom: { style: undefined },
        left: { style: undefined },
        right: { style: "thin" }
    }
    const contractorsProfitRow = worksheet.addRow(["F. CONTRACTORS PROFIT", "10.00% of D", "", "", accountingCurrency(props.data?.direct_cost * 0.1)])
    contractorsProfitRow.getCell(1).border = {
        top: { style: undefined },
        bottom: { style: undefined },
        left: { style: "thin" },
        right: { style: undefined }
    }
    contractorsProfitRow.getCell(5).border = {
        top: { style: undefined },
        bottom: { style: undefined },
        left: { style: undefined },
        right: { style: "thin" }
    }
    const vatRow = worksheet.addRow(["G. VAT (WHERE APPLICABLE)", "12.00% of (D+E+F)", "", "", accountingCurrency(props.data?.direct_cost * 0.12)])
    vatRow.getCell(1).border = {
        top: { style: undefined },
        bottom: { style: undefined },
        left: { style: "thin" },
        right: { style: undefined }
    }
    vatRow.getCell(5).border = {
        top: { style: undefined },
        bottom: { style: undefined },
        left: { style: undefined },
        right: { style: "thin" }
    }
    const totalCostRow = worksheet.addRow(["H. TOTAL COST", "(D+E+F+G)", "", "", accountingCurrency(props.data?.direct_cost * 1.22)])
    totalCostRow.getCell(1).border = {
        top: { style: undefined },
        bottom: { style: undefined },
        left: { style: "thin" },
        right: { style: undefined }
    }
    totalCostRow.getCell(5).border = {
        top: { style: undefined },
        bottom: { style: undefined },
        left: { style: undefined },
        right: { style: "thin" }
    }
    const unitCostRow = worksheet.addRow(["I. UNIT COST PER", "pc", "", "", accountingCurrency(props.data?.direct_cost / props.data?.quantity)])
    unitCostRow.eachCell((cell) => {
        cell.border = {
            top: { style: undefined },
            bottom: { style: "thin" },
            left: { style: undefined },
            right: { style: undefined }
        }
    })
    unitCostRow.getCell(1).border = {
        top: { style: undefined },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: undefined }
    }
    unitCostRow.getCell(5).border = {
        top: { style: undefined },
        bottom: { style: "thin" },
        left: { style: undefined },
        right: { style: "thin" }
    }
    worksheet.addRow([])

    // Prepared By
    worksheet.addRow(["PREPARED BY:"])
    worksheet.addRow([])
    worksheet.addRow(["ANGEL A. ABRAU"]).eachCell((cell) => {
        cell.font = { bold: true }
    })
    worksheet.addRow(["Authorized Managing Officer"])
    worksheet.addRow([
        "ME3 CONSTRUCTION / EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION (JOINT VENTURE)",
    ])
    worksheet.addRow([])
    worksheet.addRow(["DATE:", "August 20, 2025"])

    // Formatting
    worksheet.columns.forEach((col) => {
        col.width = 25
    })

    // Save file
    const buffer = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), "Detailed_Estimates.xlsx")
}
const totalDirectCost = (name: string) => {
    return props.data.resources
        .filter(resource => resource.resource_name === name)
        .reduce((total: number, resource: any) => total + (resource.total_cost ?? 0), 0)
}
const filterResources = (name: string) => {
    return props.data.resources.filter((resource: any) => resource.resource_name === name)
}
</script>
<template>
    <LayoutFormPsButton
        button-title="Export to CSV"
        button-icon="mdi:file-excel-outline"
        @click="exportToExcel"
    />
</template>
