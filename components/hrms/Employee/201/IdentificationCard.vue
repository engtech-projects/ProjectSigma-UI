<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup>
const print = () => {
    const printContents = document.getElementById("id-content").innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    window.location.reload()
}
</script>
<template>
    <div class="w-full">
        <p class="font-bold text-lg p-2">
            Employee Identification Card
        </p>
    </div>
    <div class="w-full flex justify-end py-2">
        <button class="bg-green-600 text-white hover:bg-green-400 p-2" @click="print()">
            Print
            <Icon name="ion:printer" class="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
    </div>
    <div id="id-content" class="md:flex gap-4">
        <HrmsEmployee201DetailsEmployeeIDFront />
        <HrmsEmployee201DetailsEmployeeIDBack />
    </div>
</template>
