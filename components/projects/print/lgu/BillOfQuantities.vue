<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div id="toPrint" class="flex flex-col gap-2 bg-white w-screen p-2">
        <input type="file" accept=".xlsx" class="mb-4 print:hidden" @change="handleFileUpload">

        <div v-for="(page, i) in numPages" :key="i" class="flex flex-col gap-2 pt-4 border-2 border-black pb-4 min-h-[1000px] print:min-h-[1000px] relative">
            <!-- Header -->
            <div class="text-center font-bold text-xl border-b-2 pb-2 mb-2">
                BILL OF QUANTITIES (Page {{ i + 1 }} of {{ numPages.length }})
            </div>

            <!-- Table -->
            <div v-if="columns.length" class="overflow-auto border rounded shadow p-2 print:p-0 print:shadow-none print:border-0">
                <table class="table-auto w-full border-collapse border border-gray-300 text-sm">
                    <thead class="bg-gray-200">
                        <tr>
                            <th v-for="(col, colIndex) in columns" :key="colIndex" class="border px-2 py-1">
                                {{ col }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, rowIndex) in page" :key="rowIndex">
                            <td v-for="(col, colIndex) in columns" :key="colIndex" class="border px-2 py-1">
                                {{ row[col] }}
                            </td>
                        </tr>
                        <tr v-for="index in extraRows(page.length)" :key="'filler-' + index">
                            <td v-for="col in columns" :key="col" class="border px-2 py-1">
                                &nbsp;
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Footer -->
            <div v-if="i === numPages.length - 1" class="mt-6 text-xs text-right pr-4">
                Printed by: {{ userName }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as XLSX from "xlsx"
import { ref, computed } from "vue"

// Mocked user data for footer
const userName = ref("Juan Dela Cruz")

// BOQ data
const fullData = ref<any[]>([])
const columns = ref<string[]>([])

// Chunk the data for paginated view (e.g., 20 rows per page)
const rowsPerPage = 20

function chunkArray<T> (arr: T[], chunkSize: number): T[][] {
    const result = []
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize))
    }
    return result
}

const numPages = computed(() => chunkArray(fullData.value, rowsPerPage))

function extraRows (currentLength: number) {
    return currentLength < rowsPerPage ? rowsPerPage - currentLength : 0
}

function handleFileUpload (event: Event) {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) {
        return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: "array" })

        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const json = XLSX.utils.sheet_to_json(sheet, { defval: "" })

        if (json.length > 0) {
            fullData.value = json
            columns.value = Object.keys(json[0])
        }
    }
    reader.readAsArrayBuffer(input.files[0])
}
</script>

<style scoped>
    @media print {
        .page-break {
            page-break-before: always;
        }
        input {
            display: none;
        }
        table{
            font-size: 11px;
        }
    }
</style>
