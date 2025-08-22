<script lang="ts" setup>
import { Workbook } from "exceljs"
import { saveAs } from "file-saver"

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
async function exportBOQ () {
    const wb = new Workbook()
    const ws = wb.addWorksheet("BOQ")
    // Column widths
    ws.columns = [
        { width: 15 }, // (1)
        { width: 40 }, // (2)
        { width: 10 }, // (3)
        { width: 12 }, // (4)
        { width: 20 }, // (5)
        { width: 20 }, // (6)
    ]
    // Header Info
    ws.mergeCells("A1:F1")
    ws.getCell("A1").value = "Department of Public Works and Highways"
    ws.getCell("A1").font = { bold: true, size: 14 }
    ws.getCell("A1").alignment = { horizontal: "center" }
    ws.getCell("A3").value = "Contract ID:"
    ws.getCell("B3").value = props.data.contract_id
    ws.getCell("A4").value = "Contract Name:"
    ws.getCell("B4").value = props.data.name
    ws.getCell("A5").value = "Contract Location:"
    ws.getCell("B5").value = props.data.location
    // Title
    ws.mergeCells("A7:F7")
    ws.getCell("A7").value = "BILL OF QUANTITIES"
    ws.getCell("A7").font = { bold: true, size: 13 }
    ws.getCell("A7").alignment = { horizontal: "center" }
    // Table Header Row 1
    ws.mergeCells("A9:D9")
    ws.getCell("A9").value =
    "(Columns (1), (2), (3), and (4) are to be filled up by the Procuring Entity)"
    ws.mergeCells("E9:F9")
    ws.getCell("E9").value =
    "(Columns (5) and (6) are to be filled up by the bidder)";
    [ws.getCell("A9"), ws.getCell("E9")].forEach((c) => {
        c.font = { bold: true, size: 10, color: { argb: "FFFFFFFF" } }
        c.alignment = { horizontal: "center", vertical: "middle", wrapText: true }
        c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFC000" } } // yellow
    });
    // Table Header Row 2
    ["Pay Item No.", "Description", "Unit", "Quantity", "Unit Price (Pesos)", "Amount (Pesos)"]
        .forEach((text, i) => {
            const cell = ws.getCell(10, i + 1)
            cell.value = text
            cell.font = { bold: true }
            cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true }
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: undefined },
                right: { style: "thin" },
            }
        });
    // Table Header Row 3
    ["(1)", "(2)", "(3)", "(4)", "(5)", "(6)"]
        .forEach((text, i) => {
            const cell = ws.getCell(11, i + 1)
            cell.value = text
            cell.font = { bold: true }
            cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true }
            if (i > 3) {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                }
            } else {
                cell.border = {
                    top: { style: undefined },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                }
            }
        })
    // Part 1 row
    let rowTracker = 12
    props.data.phases.forEach((phase: any) => {
        ws.mergeCells("A" + rowTracker + ":F" + rowTracker)
        ws.getCell("A" + rowTracker).value = {
            richText: [
                { text: phase.name + " ", font: { bold: false } }, // normal
                { text: phase.description, font: { bold: true } }, // bold
            ],
        }
        ws.getCell("A" + rowTracker).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFDE9" },
        }
        ws.getCell("A" + rowTracker).font = { bold: true }
        ws.getCell("A" + rowTracker).alignment = { horizontal: "left" }
        rowTracker++
        phase.tasks.forEach((task: any) => {
            // Item row
            ws.getCell("A" + rowTracker).value = task.name
            ws.getCell("B" + rowTracker).value = task.description
            ws.getCell("C" + rowTracker).value = task.unit
            ws.getCell("D" + rowTracker).value = task.quantity
            ws.getCell("E" + rowTracker).value = task.unit_price
            ws.getCell("F" + rowTracker).value = task.amount

            // Format numbers
            ws.getCell("E" + rowTracker).numFmt = "#,##0.00"
            ws.getCell("F" + rowTracker).numFmt = "#,##0.00"
            rowTracker++
        })
        // Totals
        ws.mergeCells("A" + rowTracker + ":D" + rowTracker)
        ws.getCell("A" + rowTracker).value = "TOTAL COST (PART 1) CARRIED TO THE SUMMARY"
        ws.getCell("A" + rowTracker).font = { bold: true }
        ws.getCell("E" + rowTracker).value = "PHP"
        ws.getCell("F" + rowTracker).value = phase.total_cost
        ws.getCell("F" + rowTracker).numFmt = "#,##0.00"
        ws.getCell("F" + rowTracker).font = { bold: true }
        rowTracker++
    })
    // ws.mergeCells("A" + rowTracker + ":F" + rowTracker)
    ws.getCell("A" + rowTracker).value = "TOTAL COST"
    ws.getCell("A" + rowTracker).font = { bold: true }
    ws.getCell("E" + rowTracker).value = "PHP"
    ws.getCell("F" + rowTracker).value = props.data.total_cost ?? 0
    ws.getCell("F" + rowTracker).numFmt = "#,##0.00"
    ws.getCell("F" + rowTracker).font = { bold: true }
    rowTracker++
    // Amount in Words
    ws.mergeCells("A" + rowTracker + ":F" + rowTracker)
    ws.getCell("A" + rowTracker).value =
    "TOTAL AMOUNT IN WORDS: Twenty Four Thousand Fifty Pesos Only"
    ws.getCell("A" + rowTracker).font = { italic: true, bold: true }
    ws.getCell("A" + rowTracker).alignment = { horizontal: "left" }
    rowTracker += 3
    // Footer Submitted by
    ws.mergeCells("A" + rowTracker + ":F" + rowTracker)
    ws.getCell("A" + rowTracker).value = "SUBMITTED BY:"
    rowTracker += 2
    ws.mergeCells("A" + rowTracker + ":E" + rowTracker)
    ws.getCell("A" + rowTracker).value = "ANGEL A. ABRAU"
    ws.getCell("A" + rowTracker).font = { bold: true }
    ws.getCell("F" + rowTracker).value = "DATE: August 20, 2025"
    ws.getCell("F" + rowTracker).alignment = { horizontal: "right" }
    rowTracker++
    ws.mergeCells("A" + rowTracker + ":E" + rowTracker)
    ws.getCell("A" + rowTracker).value = "Authorized Managing Officer"
    rowTracker++
    ws.mergeCells("A" + rowTracker + ":F" + rowTracker)
    ws.getCell("A" + rowTracker).value = "ME3 CONSTRUCTION / EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION (JOINT VENTURE)"
    rowTracker++
    // Save
    const buffer = await wb.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), "Bill_of_Quantities.xlsx")
}
</script>
<template>
    <LayoutFormPsButton
        button-title="Export to Excel"
        button-icon="mdi:file-excel-outline"
        @click="exportBOQ"
    />
</template>

<style>

</style>
