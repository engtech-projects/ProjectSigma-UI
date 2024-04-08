<script setup>
import vueQr from "vue-qr/src/packages/vue-qr.vue"
// import { storeToRefs } from "pinia"
// import { useEmployeeInfo } from "@/stores/hrms/employee"
// const employee = useEmployeeInfo()
// const { information } = storeToRefs(employee)
const src = ref("/evenpar.jpg")
const qrCodeData = ref(null)
const generateQRCode = () => {
    qrCodeData.value = "Hello World"
}
</script>

<template>
    <div class="md:flex gap-2 mt-0 w-4/5">
        <div class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-1/3 flex flex-col">
            <p class="flex justify-center text-2xl font-normal text-gray-900 pb-5 antialiased tracking-wide">
                QR Generator
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

        <div class="rounded-lg w-full md:w-2/3 flex">
            <div class="flex flex-col w-full justify-center bg-white shadow-lg">
                <vue-qr
                    id="employee-qr-code"
                    class="w-full"
                    :logo-src="src"
                    :text="qrCodeData??''"
                />
                <div v-if="qrCodeData" class="flex justify-center mt-4">
                    <a
                        :href="qrCodeData"
                        download="generated_qr_code.png"
                        class="text-teal-700 underline cursor-pointer"
                    >
                        Download QR Code
                    </a>
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
</style>
