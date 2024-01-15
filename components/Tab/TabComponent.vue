<template>
    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul :id="tabsId" class="flex flex-wrap -mb-px text-sm font-medium text-center" :data-tabs-toggle="tabsContentId" role="tablist">
            <li v-for="(tab, index) in tabs" :key="index" :class="tabClass(tab)" role="presentation">
                <button
                    :id="tab.id"
                    :class="tabButtonClass(tab)"
                    :data-tabs-target="tab.id"
                    type="button"
                    role="tab"
                    :aria-controls="tab.id"
                    :aria-selected="index === activeTabIndex"
                    @click="activateTab(index)"
                >
                    {{ tab.label }}
                </button>
            </li>
        </ul>
    </div>
    <div :id="tabsContentId">
        <div
            v-for="(tab, index) in tabs"
            :id="tab.id"
            :key="index"
            :class="tabContentClass(tab)"
            role="tabpanel"
            :aria-labelledby="tab.id"
        >
            <slot v-if="index === activeTabIndex" :name="tab.id" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            required: true,
        },
        tabsId: {
            type: String,
            default: "default-tab",
        },
        tabsContentId: {
            type: String,
            default: "default-tab-content",
        },
    },
    data () {
        return {
            activeTabIndex: 0,
        }
    },
    methods: {
        tabClass (tab) {
            return [
                "mr-2",
                {
                    "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300": tab.id === "tab2",
                },
            ]
        },
        tabButtonClass (tab) {
            return [
                "inline-block p-4 border-b-2 rounded-t-lg",
                {
                    "inline-block p-4 border-b-2 rounded-t-lg": tab.id === "tab1",
                },
            ]
        },
        tabContentClass (tab) {
            return [
                "hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800",
                {
                    "hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800": tab.id === "tab1",
                },
            ]
        },
        activateTab (index) {
            this.activeTabIndex = index
        },
    },
}
</script>
