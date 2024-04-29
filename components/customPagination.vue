<script setup>
defineProps({
    links: {
        type: Object,
        required: true,
    },
})
const emit = defineEmits(["changeParams"])

const setParams = (link) => {
    const searchParams = new URLSearchParams(new URL(link).searchParams)
    emit("changeParams", Object.fromEntries([...searchParams]))
}
</script>

<template>
    <div id="pagination" class="flex items-center text-xs space-x-1 lg:text-sm">
        <a
            v-if="links.first_page"
            class="flex flex-col justify-center p-2"
            href="#"
            @click.prevent="setParams(links.first_page)"
        >
            <Icon name="ep:d-arrow-left" class="h-5 w-5 lg:h-5 lg:w-5" />
        </a>
        <div class="flex items-center space-x-1">
            <a
                v-for="link,index in links.pages"
                :key="index"
                href="#"
                :class="link.active ? 'bg-color1 text-black': 'bg-white'"
                @click.prevent="setParams(link.url)"
            >
                {{ link.label.includes('Next') ? "Next" : link.label.includes('Prev') ? "Back" : link.label }}
            </a>
        </div>
        <a
            v-if="links.last_page"
            class="flex flex-col justify-center p-2"
            href="#"
            @click.prevent="setParams(links.last_page)"
        >
            <Icon name="ep:d-arrow-right" class="h-4 w-4 lg:h-5 lg:w-5" />
        </a>
    </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    #pagination a {
        @apply border border-slate-300 rounded no-underline transition duration-300 py-1 px-2.5;
    }
}

@layer utilities {
    #pagination a:hover {
        @apply bg-teal-600;
    }
}
</style>
