<script setup>
import vueQr from "vue-qr/src/packages/vue-qr.vue"
import { storeToRefs } from "pinia"
import domtoimage from "dom-to-image-more"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const src = ref("/evenpar.jpg")
const qrCodeData = ref(null)

const employee = useEmployeeInfo()
const { information } = storeToRefs(employee)

const generateQRCode = () => {
    qrCodeData.value = information.value.company_employments.employeedisplay_id
}
const downloadQR = () => {
    const node = document.getElementById("employee-qr-code")
    domtoimage
        .toJpeg(node)
        .then(function (dataUrl) {
            const a = document.createElement("a")
            a.href = dataUrl
            a.download = employee.information.fullname_first + "-qr.jpeg"
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
    <div class="md:flex gap-2 mt-0 w-full">
        <div class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-1/3 flex flex-col">
            <p class="flex justify-center text-2xl font-normal text-gray-900 pb-5 antialiased tracking-wide">
                QR-CODE GENERATOR
            </p>
            <div class="w-full">
                <HrmsEmployee201SearchProfile />
            </div>
            <div class="flex w-full justify-end mt-2">
                <button
                    type="submit"
                    class="flex gap-1 justify-center text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-gray-900 dark:hover:bg-gray-800"
                    @click.prevent="generateQRCode()"
                >
                    <Icon
                        name="material-symbols:qr-code-2-add"
                        class="w-5 h-5"
                        color="white"
                    />
                    Generate QR Code
                </button>
            </div>
        </div>
        <div class="rounded-lg w-full md:w-2/3 flex bg-white">
            <div class="flex flex-col gap-2 w-[300px] h-96 mt-2">
                <div v-if="qrCodeData" id="qr-code-content" class="shadow-xl m-auto text-center w-full">
                    <button class="w-full h-8 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" @click="downloadQR()">
                        <Icon name="ic:outline-cloud-download" color="white" class="w-5 h-5" />
                        Download
                    </button>
                    <p class="text-center text-xl p-2">
                        {{ information.company_employments.employeedisplay_id }}
                    </p>
                    <vue-qr
                        id="employee-qr-code"
                        class="w-[2in]"
                        :correct-level="3"
                        :logo-src="src"
                        :logo-margin="5"
                        :text="qrCodeData"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    #employee-qr-code {
        image-rendering: pixelated;
        width: 100%;
    }
    div, p, img, span, td, tr {
        /* remove border in image */
        border: hidden;
    }
</style>
