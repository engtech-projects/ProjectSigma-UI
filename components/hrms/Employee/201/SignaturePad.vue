<script setup>

const undo = () => {
    this.$refs.signaturePad.undoSignature()
}
const save = () => {
    const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
    console.log(isEmpty)
    console.log(data)
}

</script>
<template>
    <div class="w-full">
        <VueSignaturePad
            ref="signaturePad"
            width="500px"
            height="500px"
        />
        <div>
            <button
                @click="save()"
            >
                Save
            </button>
            <button
                @click="undo()"
            >
                Undo
            </button>
        </div>
    </div>
</template>

