<script setup>
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode"
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"

const attendancePortal = useAttendancePortal()
const { attendanceLogs } = storeToRefs(attendancePortal)
const grouptype = ref(null)
const decodedtext = ref(null)
const backtrackTime = ref(null)
const result = ref(null)
const errorMessage = ref(null)
const QRCodeConfiguration = {
    fps: 10,
    qrbox: 250,
    aspectRatio: 1.76666,
    rememberLastUsedCamera: false,
    useBarCodeDetectorIfSupported: true,
    supportedScanTypes: [
        Html5QrcodeScanType.SCAN_TYPE_CAMERA
    ],
}
const onScanSuccess = (decodedText, decodedResult) => {
    decodedtext.value = decodedText
    result.value = decodedResult
}
const onScanFailure = (error) => {
    errorMessage.value = error
}
onNuxtReady(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", QRCodeConfiguration, false)
    html5QrcodeScanner.render(onScanSuccess, onScanFailure)
})
</script>
<template>
    <div class="md:flex gap-2 mt-0 w-full">
        <div class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-1/2 flex flex-col">
            <p class="flex justify-center text-2xl font-normal text-gray-900 pb-5 antialiased tracking-wide">
                QR-CODE ATTENDANCE
            </p>
            <HrmsCommonDepartmentProjectSelector
                v-model:select-type="grouptype"
                v-model:department-id="attendanceLogs.params.department_id"
                v-model:project-id="attendanceLogs.params.project_id"
                title="Filter Department/Project"
            />
            <div class="py-4">
                <p>
                    Time Backtracks
                </p>
                <div class="md:flex gap-2 space-x-2 p-2">
                    <input id="newhire" v-model="backtrackTime" class="" type="radio" value="New Hire">
                    <label
                        for="newhire"
                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                    >5 Minutes</label>
                    <input id="transfer" v-model="backtrackTime" class="" type="radio" value="Transfer">
                    <label
                        for="transfer"
                        class="text-xs text-gray-900 dark:text-gray-300"
                    >10 Minutes</label>
                    <input id="promotion" v-model="backtrackTime" type="radio" value="Promotion">
                    <label
                        for="promotion"
                        class="text-xs text-gray-900 dark:text-gray-300"
                    >15 Minutes</label>
                    <input id="termination" v-model="backtrackTime" class="" type="radio" value="Termination">
                    <label
                        for="termination"
                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                    >30 Minutes</label>
                </div>
            </div>
        </div>
        <div class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-1/2 flex flex-col">
            <p class="flex justify-center text-2xl font-normal text-gray-900 pb-5 antialiased tracking-wide">
                QR-CODE SCANNER
            </p>
            <div class="w-full justify-center flex">
                <div id="reader" class="w-full" />
            </div>
        </div>
    </div>
</template>
