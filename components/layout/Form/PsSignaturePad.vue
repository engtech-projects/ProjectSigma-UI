<script setup lang="ts">
import { useEmployeeInfo } from "@/stores/hrms/employee"

const snackbar = useSnackbar()
const employee = useEmployeeInfo()

const compId = useId()
const signature = ref()
const save = async () => {
    try {
        const formData = new FormData()
        formData.append("image_file", signature.value.saveSignature().data)
        await employee.saveDigitalSignatureUpload(formData)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
const undo = () => {
    signature.value.undoSignature()
}
</script>

<template>
    <div>
        <div class="w-full p-2">
            <p>Signature</p>
        </div>
        <VueSignaturePad
            :id="compId"
            ref="signature"
            :width="'500'"
            :height="'300'"
            :options="{ onBegin: () => { signature.resizeCanvas() } }"
            class="z-50 m-auto shadow-lg"
        />
        <div class="w-full flex justify-end gap-2 mt-5">
            <button class="p-2 bg-green-600 text-white hover:bg-green-400" @click="save()">
                Save Signature
            </button>
            <button class="p-2 bg-yellow-500 text-white hover:bg-yellow-300" @click="undo()">
                Undo Signature
            </button>
        </div>
    </div>
</template>
