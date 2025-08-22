<script setup lang="ts">
// const snackbar = useSnackbar()
const { $printJS } = useNuxtApp()
defineProps({
    printButtonTitle: {
        type: String,
        default: "Print"
    },
    showExportButton: {
        type: Boolean,
        default: false
    }
})
const compId = useId()
const showPrintLayout = ref(false)
const print = () => {
    const headContent = document.getElementsByTagName("head")[0].innerHTML
    const printContents = document.getElementById("" + compId + (showPrintLayout.value ? "printLayout" : "systemLayout")).innerHTML
    const printWindow = window.open("", "_blank")
    printWindow.document.write(headContent)
    printWindow.document.write(printContents)
    setTimeout(() => {
        printWindow.print()
        printWindow.close()
    }, 1000)
}
const exportPDF = () => {
    $printJS({
        printable: compId + (showPrintLayout.value ? "printLayout" : "systemLayout"),
        type: "html",
        targetStyles: ["*"],
        showModal: true,
        modalMessage: "Preparing document for printing...",
        maxWidth: 10,
    })
}
</script>
<template>
    <div
        v-show="!showPrintLayout"
        :id="compId + 'systemLayout'"
        class="PrintContainer w-full"
    >
        <slot name="system-layout" />
    </div>
    <div
        v-show="showPrintLayout"
        :id="compId + 'printLayout'"
        class="PrintContainer w-full"
    >
        <slot name="print-layout" />
    </div>
    <div class="flex justify-end gap-2 mt-4">
        <button
            v-show="!showPrintLayout"
            class="flex justify-end items-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="showPrintLayout = true"
        >
            <Icon
                name="oi:document"
                class="w-4 h-4 mr-1"
                fill="currentColor"
            />Show Print Layout
        </button>
        <button
            v-show="showPrintLayout"
            class="flex justify-end items-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="showPrintLayout = false"
        >
            <Icon
                name="oi:browser"
                class="w-4 h-4 mr-1"
                fill="currentColor"
            />Show System Layout
        </button>
        <div class="relative flex justify-end items-center group">
            <button
                v-if="showExportButton"
                class="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 shadow-lg"
                @click="exportPDF"
            >
                Export PDF
            </button>
            <button
                class="flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors"
                @click="print"
            >
                <Icon name="ic:baseline-local-printshop" class="w-4 h-4 mr-1" fill="currentColor" />
                {{ printButtonTitle }}
            </button>
        </div>
    </div>
</template>
