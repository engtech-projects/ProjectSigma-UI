<template>
    <div class="flex">
        <ul class="space-y-1 text-sm">
            <template v-for="item in tabs" :key="item.key">
                <li
                    :class="['cursor-pointer hover:bg-gray-100 px-2 py-1',{ 'bg-gray-200 font-bold': activeTab === item.key }]"
                    @click="handleClick(item.key)"
                >
                    <div class="flex items-center">
                        <Icon :name="item.icon" class="mr-2" />
                        <span>{{ item.label }}</span>
                    </div>
                </li>
                <li v-if="item.children" class="px-2 py-1">
                    <ul class="pl-4 mt-1 space-y-1">
                        <li
                            v-for="child in item.children"
                            :key="child.key"
                            :class="['cursor-pointer hover:underline',{ 'text-blue-600 font-semibold': activeTab === child.key }]"
                            @click.stop="handleClick(child.key)"
                        >
                            <div class="flex items-center">
                                <Icon :name="child.icon" class="mr-2" />
                                <span>{{ child.label }}</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps({
    activeTab: {
        type: String,
        default: ""
    },
    tabs: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(["update:activeTab"])

const handleClick = (tabKey: string) => {
    emit("update:activeTab", tabKey)
}

</script>
