<template>
    <div
        class="absolute top-full mt-2 p-2 min-w-[300px] bg-white border border-gray-300 rounded-lg shadow-lg text-sm text-gray-700"
        :style="{ transform: 'translateX(-50%)' }"
        :class="{
            'left-[100px]': props.position === 'left',
            'right-[-150px]': props.position === 'right'
        }"
    >
        <table class="w-full table-auto">
            <thead>
                <tr>
                    <th class="px-2 py-1 font-semibold text-gray-800">
                        Title
                    </th>
                    <th class="px-2 py-1 font-semibold text-gray-800">
                        Signatory
                    </th>
                    <th class="px-2 py-1 font-semibold text-gray-800">
                        Status
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="sig,i in signatories.data" :key="i">
                    <td class="px-2 py-1 text-gray-400 text-xs flex items-center">
                        <div
                            :class="{
                                'bg-green-500 text-white': sig.status === 'Approved',
                                'bg-gray-300 text-gray-700': sig.status === 'Pending',
                                'bg-yellow-300 text-gray-700': sig.status === 'Rejected'
                            }"
                            class="w-4 h-4 mr-2 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-300 z-10"
                        >
                            <Icon v-if="sig.status === 'Approved'" name="iconamoon:check-bold" class="h-4 w-4" />
                            <Icon v-else-if="sig.status === 'Pending'" name="material-symbols:timelapse-outline-rounded" class="h-4 w-4" />
                            <Icon v-else-if="sig.status === 'Rejected'" name="material-symbols:cancel-rounded" class="h-4 w-4" />
                        </div>
                        {{ props.title }}
                    </td>
                    <td class="px-2 py-1 text-gray-400 text-xs">
                        {{ sig.name }}
                    </td>
                    <td class="px-2 py-1 text-gray-400 text-xs">
                        {{ sig.status }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    signatory: {
        type: Array,
        default: null
    },
    position: {
        type: String,
        default: "left"
    },
    title: {
        type: String,
        default: ""
    }
})
const signatories = computed(() => {
    const sig = props.signatory
    if (props.signatory.details) {
        sig.data = props.signatory.details
    }
    return sig
})
</script>

  <style scoped>
  /* Additional scoped styles if needed */
  </style>
