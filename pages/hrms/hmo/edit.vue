<script setup lang="ts">
import { useHMOStore } from "@/stores/hrms/setup/hmo"
const hmostore = useHMOStore()
await hmostore.showHmo(useRoute().query.hmo_id)
</script>

<template>
    <div>
        <HrmsHmoEdit />
    </div>
</template>
