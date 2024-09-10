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
        employee.getEmployeeInformation(employee.information.id)
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
        <div class="w-full mt-5">
            <div class="w-fit m-auto">
                <div class="flex flex-row justify-between items-center">
                    <div class="w-full p-2">
                        <p>Signature</p>
                    </div>
                    <div class="flex flex-row justify-between items-center">
                        <button class="p-2 bg-green-600 text-white hover:bg-green-400" @click="save()">
                            <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button class="p-2 bg-yellow-500 text-white hover:bg-yellow-300" @click="undo()">
                            <Icon name="ion:arrow-undo" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                    </div>
                </div>
                <VueSignaturePad
                    :id="compId"
                    ref="signature"
                    :width="'500'"
                    :height="'300'"
                    :options="{ onBegin: () => { signature.resizeCanvas() } }"
                    class="z-50 m-auto shadow-lg outline"
                />
            </div>
        </div>
    </div>
</template>
