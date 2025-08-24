<script lang="ts" setup>
import { Workbook } from "exceljs"
import { saveAs } from "file-saver"

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
async function createCashFlowSchedule () {
    const wb = new Workbook()
    const ws = wb.addWorksheet("Cash Flow")
    // Title
    ws.mergeCells("A1:H1")
    ws.getCell("A1").value = "ME3 CONSTRUCTION/EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION (JOINT VENTURE)"
    ws.getCell("A1").alignment = { horizontal: "center" }
    ws.getCell("A1").font = { bold: true }
    // Contract Info
    ws.getCell("A3").value = "Contract ID"
    ws.getCell("B3").value = props.data.contract_id
    ws.getCell("B3").font = { bold: true }
    ws.getCell("A4").value = "Contract Name"
    ws.getCell("B4").value = props.data.name
    ws.getCell("B4").font = { bold: true }
    ws.getCell("A5").value = "Contract Location"
    ws.getCell("B5").value = props.data.location
    ws.getCell("B5").font = { bold: true }
    // Subtitle
    ws.mergeCells("A7:H7")
    ws.getCell("A7").value = "CASH FLOW BY QUARTER AND PAYMENT SCHEDULE"
    ws.addRow([])
    ws.getCell("A7").alignment = { horizontal: "center" }
    ws.getCell("A7").font = { bold: true }
    // Table Header
    const headerRow = [
        "PARTICULAR",
        "%WT",
        "1ST QUARTER",
        "2ND QUARTER",
        "3RD QUARTER",
        "4TH QUARTER",
    ]
    ws.addRow(headerRow)
    const header = ws.getRow(9)
    header.eachCell((cell) => {
        cell.font = { bold: true }
        cell.alignment = { horizontal: "left", vertical: "middle" }
        cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
        }
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "D9D9D9" },
        }
    })
    ws.addRows(rowData.value)
    // Style for data rows
    ws.eachRow((row, rowNumber) => {
        if (rowNumber >= 10) {
            row.eachCell((cell) => {
                cell.alignment = { horizontal: "left", vertical: "middle" }
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                }
            })
        }
    })

    // Submitted by section
    ws.getCell("A15").value = "Submitted by:"
    ws.getCell("A17").value = "Name:"
    ws.getCell("B17").value = "ANGEL A. ABRAU"
    ws.getCell("B17").font = { bold: true }
    ws.getCell("A18").value = "Position:"
    ws.getCell("B18").value = "Authorized Managing Officer"
    ws.getCell("A19").value = "Name of the Bidder:"
    ws.getCell("B19").value =
    "ME3 CONSTRUCTION / EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION (JOINT VENTURE)"
    ws.getCell("A20").value = "Date:"
    ws.getCell("B20").value = "August 21, 2025"

    autoFitColumns(ws)
    /// Save
    const buffer = await wb.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), "CashFlow.xlsx")
}

const processedData = computed(() => {
    const data: any = []
    const cashFlow = props.data.cash_flow
    if (cashFlow?.q1 && typeof cashFlow.q1 === "object") {
        for (const i in cashFlow.q1) {
            data.push({ name: i, values: {} })
        }
        for (const i in data) {
            const value = data[i]
            for (const j in cashFlow) {
                if (cashFlow[j] && typeof cashFlow[j] === "object") {
                    for (const k in cashFlow[j]) {
                        if (value.name === k) {
                            value.values[j] = cashFlow[j][k]
                        }
                    }
                }
            }
        }
    }
    return data
})

const rowData = computed(() => {
    const data: any = []
    processedData.value.forEach((item: any) => {
        data.push([
            item.name.toUpperCase().replace("_", " "),
            item.values.wtax ?? "0" + " %",
            item.values.q1 ?? "0" + " %",
            item.values.q2 ?? "0" + " %",
            item.values.q3 ?? "0" + " %",
            item.values.q4 ?? "0" + " %",
        ])
    })
    return data
})
function autoFitColumns (worksheet) {
    worksheet.columns.forEach((column) => {
        let maxLength = 10 // minimum width
        column.eachCell({ includeEmpty: true }, (cell) => {
            const cellValue = cell.value ? cell.value.toString() : ""
            maxLength = Math.max(maxLength, cellValue.length)
        })
        column.width = maxLength + 2 // add padding
    })
}
</script>
<template>
    <LayoutFormPsButton
        button-title="Export to Excel"
        button-icon="mdi:file-excel-outline"
        @click="createCashFlowSchedule"
    />
</template>
