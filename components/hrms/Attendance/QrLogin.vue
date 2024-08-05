<script setup>
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode"
import { useAttendancePortal } from "~/stores/hrms/attendancePortal"

const attendancePortal = useAttendancePortal()
const snackbar = useSnackbar()
const boardLoading = ref(false)
const { qrAttendanceParams, CATEGORY_TIME_IN } = storeToRefs(attendancePortal)
const grouptype = ref(null)
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
qrAttendanceParams.value.log_type = CATEGORY_TIME_IN
const onScanSuccess = async (decodedText, decodedResult) => {
    qrAttendanceParams.value.employee_code = decodedText
    qrAttendanceParams.value.result = JSON.stringify(decodedResult)
    try {
        boardLoading.value = true
        await attendancePortal.saveAttendanceLogQr()
        snackbar.add({
            type: "success",
            text: attendancePortal.successMessage
        })
        initQRCode()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
        initQRCode()
    } finally {
        boardLoading.value = false
        useAttendancePortal.$reset()
        boardLoading.value = false
    }
}
const onScanFailure = (error) => {
    errorMessage.value = error
}
onNuxtReady(() => {
    initQRCode()
})
const initQRCode = () => {
    const html5QrcodeScanner = new Html5QrcodeScanner("reader", QRCodeConfiguration, false)
    html5QrcodeScanner.render(onScanSuccess, onScanFailure)
}
</script>
<template>
    <div class="md:flex gap-2 mt-0 w-full">
        <div class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-1/2 flex flex-col">
            <p class="flex justify-center text-2xl font-normal text-gray-900 pb-5 antialiased tracking-wide">
                QR-CODE ATTENDANCE
            </p>
            <HrmsCommonDepartmentProjectSelector
                v-model:select-type="grouptype"
                v-model:department-id="qrAttendanceParams.department_id"
                v-model:project-id="qrAttendanceParams.project_id"
                title="Filter Department/Project"
            />
            <div v-if="qrAttendanceParams.department_id || qrAttendanceParams.project_id" class="py-4">
                <p>
                    LOG-TYPE
                </p>
                <div class="md:flex gap-2 space-x-2 p-2">
                    <input id="log_type_in" v-model="qrAttendanceParams.log_type" class="" type="radio" value="In">
                    <label
                        for="log_type_in"
                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                    >IN</label>
                    <input id="log_type_out" v-model="qrAttendanceParams.log_type" class="" type="radio" value="Out">
                    <label
                        for="log_type_out"
                        class="text-xs text-gray-900 dark:text-gray-300"
                    >OUT</label>
                </div>
            </div>
            <div v-if="qrAttendanceParams.log_type" class="py-4">
                <p>
                    Time Offset
                </p>
                <div class="md:flex gap-2 space-x-2 p-2">
                    <input id="newhire" v-model="qrAttendanceParams.offset" class="" type="radio" value="0">
                    <label
                        for="newhire"
                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                    >None</label>
                    <input id="newhire" v-model="qrAttendanceParams.offset" class="" type="radio" value="5">
                    <label
                        for="newhire"
                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                    >5 Minutes</label>
                    <input id="transfer" v-model="qrAttendanceParams.offset" class="" type="radio" value="10">
                    <label
                        for="transfer"
                        class="text-xs text-gray-900 dark:text-gray-300"
                    >10 Minutes</label>
                    <input id="promotion" v-model="qrAttendanceParams.offset" type="radio" value="15">
                    <label
                        for="promotion"
                        class="text-xs text-gray-900 dark:text-gray-300"
                    >15 Minutes</label>
                    <input id="termination" v-model="qrAttendanceParams.offset" class="" type="radio" value="30">
                    <label
                        for="termination"
                        class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                    >30 Minutes</label>
                </div>
            </div>
            <div>
                {{ qrAttendanceParams.decode_result }}
            </div>
        </div>
        <LayoutBoards :loading="boardLoading" class="shadow-md p-4 bg-white mb-3 border border-gray-300 rounded-lg w-full md:w-1/2 flex flex-col">
            <p class="flex justify-center text-2xl font-normal text-gray-900 pb-5 antialiased tracking-wide">
                QR-CODE SCANNER
            </p>
            <div class="w-full justify-center flex">
                <div id="reader" class="w-full m-auto" />
            </div>
        </LayoutBoards>
    </div>
</template>
