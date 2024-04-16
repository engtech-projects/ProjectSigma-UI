<script setup lang="ts">
const compId = useId()
const signature = ref()
const save = () => {
    // signature.value.saveSignature().data
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
            class="z-50 m-auto bg-red-500"
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
