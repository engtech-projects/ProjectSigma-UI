<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup>
import domtoimage from "dom-to-image-more"
const snackbar = useSnackbar()
const printFront = () => {
    const node = document.getElementById("front-id")
    domtoimage
        .toJpeg(node)
        .then(function (dataUrl) {
            const a = document.createElement("a")
            a.href = dataUrl
            a.download = "output.jpeg"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        })
        .catch(function (error) {
            throw error
        })
}
const printBack = () => {
    const node = document.getElementById("back-id")
    domtoimage
        .toJpeg(node)
        .then(function (dataUrl) {
            const a = document.createElement("a")
            a.href = dataUrl
            a.download = "output.jpeg"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        })
        .catch(function (error) {
            throw error
        })
}
</script>
<template>
    <div class="w-full">
        <p class="font-bold text-lg p-2">
            Employee Identification Card
        </p>
    </div>
    <div class="w-full flex justify-between py-2 gap-2">
        <button class="bg-green-600 text-white hover:bg-green-400 p-2" @click="printFront()">
            Print Front
            <Icon name="ion:printer" class="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
        <button class="bg-green-600 text-white hover:bg-green-400 p-2" @click="printBack()">
            Print Back
            <Icon name="ion:printer" class="h-4 w-4 lg:h-5 lg:w-5" />
        </button>
    </div>
    <div id="id-content" class="md:flex gap-4">
        <HrmsEmployee201DetailsEmployeeIDFront />
        <HrmsEmployee201DetailsEmployeeIDBack />
    </div>
</template>
