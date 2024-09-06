<script setup>
const compId = useId()
const print = () => {
    const headContent = document.getElementsByTagName("head")[0].innerHTML
    const printContents = document.getElementById("" + compId).innerHTML
    const printWindow = window.open("", "_blank")
    printWindow.document.write(headContent)
    printWindow.document.write(printContents)
    setTimeout(() => {
        printWindow.print()
    }, 1000)
}
</script>
<template>
    <div
        :id="compId"
        class="PrintContainer"
    >
        <slot />
    </div>
    <button
        class="flex justify-end items-center ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="print"
    >
        <Icon
            name="ic:baseline-local-printshop"
            class="w-4 h-4 mr-1"
            fill="currentColor"
        />Print Report
    </button>
</template>
